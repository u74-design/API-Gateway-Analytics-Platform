import Api from "../models/api.model.js";
import Analytics from "../models/analytics.model.js";
import crypto from "crypto";
import parseWindow from "../utils/windowParser.js";
import { createApiKey, hashApiKey } from "../utils/apiKey.js";
import { assertSafeTargetUrl } from "../utils/targetUrl.js";

const proxyUrlFor = (api) => `${process.env.BASE_URL}/proxy/${api.proxyId}`;

const validateSettings = async ({ name, targetUrl, rateLimit, window, cacheEnabled = true, cacheTTL = 300 }) => {
    const limit = Number(rateLimit);
    const seconds = parseWindow(window ?? "60s");
    const ttl = Number(cacheTTL);
    if (typeof name !== "string" || !name.trim() || name.trim().length > 100) throw new Error("Name must be between 1 and 100 characters");
    if (!Number.isInteger(limit) || limit < 1 || limit > 100000) throw new Error("Rate limit must be an integer between 1 and 100000");
    if (!seconds) throw new Error("Window must be between 1 second and 1 day (for example 60, 1m, or 1h)");
    if (!Number.isInteger(ttl) || ttl < 1 || ttl > 86400) throw new Error("Cache TTL must be an integer between 1 and 86400 seconds");
    if (typeof cacheEnabled !== "boolean") throw new Error("cacheEnabled must be true or false");
    return { name: name.trim(), targetUrl: await assertSafeTargetUrl(targetUrl), rateLimit: limit, window: `${seconds}s`, cacheEnabled, cacheTTL: ttl };
};

const RegisterApi = async (req, res) => {
    try {
        const settings = await validateSettings(req.body);
        const apiKey = createApiKey();
        const api = await Api.create({ ...settings, proxyId: crypto.randomUUID(), apiKeyHash: hashApiKey(apiKey), owner: req.user._id });
        return res.status(201).json({ success: true, message: "API registered successfully", api: { id: api._id, ...settings, proxyId: api.proxyId, proxyUrl: proxyUrlFor(api), apiKey } });
    } catch (error) {
        console.error("API registration failed", error.message);
        return res.status(400).json({ success: false, message: error.message || "Error registering API" });
    }
};

const GetmyApis = async (req, res) => {
    try {
        const apis = await Api.find({ owner: req.user._id }).sort({ createdAt: -1 }).lean();
        const ids = apis.map((api) => api._id);
        const metrics = await Analytics.aggregate([{ $match: { apiId: { $in: ids } } }, { $sort: { createdAt: -1 } }, { $group: { _id: "$apiId", requests: { $sum: 1 }, avgLatency: { $avg: "$latency" }, lastLog: { $first: "$$ROOT" } } }]);
        const metricsByApi = new Map(metrics.map((metric) => [String(metric._id), metric]));
        const result = apis.map((api) => {
            const metric = metricsByApi.get(String(api._id));
            const lastLog = metric?.lastLog;
            return { _id: api._id, name: api.name, targetUrl: api.targetUrl, proxyId: api.proxyId, proxyUrl: proxyUrlFor(api), cacheEnabled: api.cacheEnabled, cacheTTL: api.cacheTTL, rateLimit: api.rateLimit, window: api.window, requests: metric?.requests || 0, avgLatency: Math.round(metric?.avgLatency || 0), status: !lastLog ? "Inactive" : lastLog.blocked ? "Rate Limited" : lastLog.statusCode >= 500 ? "Error" : "Active" };
        });
        return res.status(200).json({ success: true, apis: result });
    } catch (error) {
        console.error("Fetch APIs failed", error.message);
        return res.status(500).json({ success: false, message: "Error fetching APIs" });
    }
};

const RegenerateApiKey = async (req, res) => {
    try {
        const apiKey = createApiKey();
        const api = await Api.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, { $set: { apiKeyHash: hashApiKey(apiKey) }, $unset: { apiKey: "" } }, { new: true });
        if (!api) return res.status(404).json({ success: false, message: "API not found" });
        return res.status(200).json({ success: true, message: "API key regenerated. Save it now; it will not be shown again.", apiKey });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error regenerating API key" });
    }
};

const DeleteApi = async (req, res) => {
    try {
        const api = await Api.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!api) return res.status(404).json({ success: false, message: "API not found" });
        await Analytics.deleteMany({ apiId: api._id });
        return res.status(200).json({ success: true, message: "API deleted successfully" });
    } catch (error) {
        console.error("Delete API failed", error.message);
        return res.status(500).json({ success: false, message: "Error deleting API" });
    }
};

export { RegisterApi, GetmyApis, RegenerateApiKey, DeleteApi };
