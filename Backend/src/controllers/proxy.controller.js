import axios from "axios";
import crypto from "crypto";
import http from "http";
import https from "https";
import dns from "dns";
import Api from "../models/api.model.js";
import redis from "../config/redis.js";
import Analytics from "../models/analytics.model.js";
import parseWindow from "../utils/windowParser.js";
import { keysMatch } from "../utils/apiKey.js";
import { isPublicIpAddress } from "../utils/targetUrl.js";

const HOP_BY_HOP_HEADERS = new Set(["connection", "keep-alive", "proxy-authenticate", "proxy-authorization", "te", "trailer", "transfer-encoding", "upgrade", "host", "x-api-key"]);
const RESPONSE_HEADERS = new Set(["content-type", "cache-control", "etag", "last-modified", "content-language", "content-disposition"]);

const secureLookup = (hostname, _options, callback) => {
    dns.lookup(hostname, { all: true, verbatim: true }, (error, records) => {
        if (error) return callback(error);
        const record = records.find(({ address }) => isPublicIpAddress(address));
        if (!record) return callback(new Error("Target host resolved to a private or reserved address"));
        return callback(null, record.address, record.family);
    });
};
const httpAgent = new http.Agent({ keepAlive: true, lookup: secureLookup });
const httpsAgent = new https.Agent({ keepAlive: true, lookup: secureLookup });

const createTargetUrl = (api, req) => {
    const target = new URL(api.targetUrl);
    const path = Array.isArray(req.params.path) ? req.params.path.join("/") : req.params.path;
    target.pathname = `${target.pathname.replace(/\/$/, "")}${path ? `/${path}` : ""}` || "/";
    const queryIndex = req.originalUrl.indexOf("?");
    target.search = queryIndex === -1 ? "" : req.originalUrl.slice(queryIndex);
    return target.toString();
};
const requestHeaders = (headers) => Object.fromEntries(Object.entries(headers).filter(([name]) => !HOP_BY_HOP_HEADERS.has(name.toLowerCase())));
const responseHeaders = (headers) => Object.fromEntries(Object.entries(headers).filter(([name, value]) => RESPONSE_HEADERS.has(name.toLowerCase()) && value !== undefined));
const writeAnalytics = (values) => Analytics.create(values).catch((error) => console.error("Analytics write failed", error.message));
const cacheKeyFor = (api, req) => crypto.createHash("sha256").update(`${api.proxyId}:${req.method}:${req.originalUrl}`).digest("hex");

const handleProxyRequest = async (req, res) => {
    const startedAt = Date.now();
    let api;
    const clientIp = req.ip;
    try {
        api = await Api.findOne({ proxyId: req.params.proxyId }).select("+apiKey +apiKeyHash");
        if (!api) return res.status(404).json({ success: false, message: "API not found" });
        const apiKey = req.get("x-api-key");
        if (!apiKey) return res.status(401).json({ success: false, message: "API key is required" });
        const declaredLength = Number(req.get("content-length") || 0);
        if (declaredLength > Number(process.env.MAX_REQUEST_BODY_BYTES || 1024 * 1024)) {
            return res.status(413).json({ success: false, message: "Request body is too large" });
        }
        const legacyMatch = api.apiKey && Buffer.byteLength(apiKey) === Buffer.byteLength(api.apiKey) && crypto.timingSafeEqual(Buffer.from(apiKey), Buffer.from(api.apiKey));
        if (!(api.apiKeyHash ? keysMatch(apiKey, api.apiKeyHash) : legacyMatch)) return res.status(401).json({ success: false, message: "Invalid API key" });

        const windowSeconds = parseWindow(api.window);
        if (!windowSeconds) throw new Error("Invalid API rate-limit window configuration");
        const rateKey = `rate_limit:${api.proxyId}:${clientIp}`;
        const count = await redis.incr(rateKey);
        if (count === 1) await redis.expire(rateKey, windowSeconds);
        if (count > api.rateLimit) {
            await writeAnalytics({ apiId: api._id, owner: api.owner, proxyId: api.proxyId, clientIp, statusCode: 429, latency: 0, blocked: true, source: "rate_limit" });
            return res.status(429).json({ success: false, message: "Rate limit exceeded" });
        }

        const cacheable = api.cacheEnabled && req.method === "GET" && !req.get("authorization") && !req.get("cookie");
        const cacheKey = cacheable ? cacheKeyFor(api, req) : null;
        if (cacheKey) {
            const raw = await redis.get(`cache:${cacheKey}`);
            if (raw) {
                try {
                    const cached = JSON.parse(raw);
                    await writeAnalytics({ apiId: api._id, owner: api.owner, proxyId: api.proxyId, clientIp, statusCode: cached.status, latency: Date.now() - startedAt, blocked: false, source: "cache" });
                    for (const [name, value] of Object.entries(cached.headers || {})) res.setHeader(name, value);
                    return res.status(cached.status).send(Buffer.from(cached.body, "base64"));
                } catch { await redis.del(`cache:${cacheKey}`); }
            }
        }

        const upstream = await axios({ method: req.method, url: createTargetUrl(api, req), headers: requestHeaders(req.headers), data: ["GET", "HEAD"].includes(req.method) ? undefined : req, timeout: Number(process.env.UPSTREAM_TIMEOUT_MS || 10000), maxRedirects: 0, responseType: "arraybuffer", validateStatus: () => true, httpAgent, httpsAgent, maxContentLength: Number(process.env.MAX_UPSTREAM_RESPONSE_BYTES || 10 * 1024 * 1024), maxBodyLength: Number(process.env.MAX_REQUEST_BODY_BYTES || 1024 * 1024) });
        const headers = responseHeaders(upstream.headers);
        const body = Buffer.from(upstream.data);
        if (cacheKey && upstream.status >= 200 && upstream.status < 300 && !upstream.headers["set-cookie"]) await redis.set(`cache:${cacheKey}`, JSON.stringify({ status: upstream.status, headers, body: body.toString("base64") }), "EX", api.cacheTTL);
        await writeAnalytics({ apiId: api._id, owner: api.owner, proxyId: api.proxyId, clientIp, statusCode: upstream.status, latency: Date.now() - startedAt, blocked: false, source: "api" });
        for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
        return res.status(upstream.status).send(body);
    } catch (error) {
        console.error("Proxy error", error.message);
        if (api) await writeAnalytics({ apiId: api._id, owner: api.owner, proxyId: api.proxyId, clientIp, statusCode: 502, latency: Date.now() - startedAt, blocked: false, source: "api" });
        return res.status(error.code === "ECONNABORTED" ? 504 : 502).json({ success: false, message: "Unable to reach the upstream API" });
    }
};

export { handleProxyRequest };
