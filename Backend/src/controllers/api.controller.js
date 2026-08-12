import Api from "../models/api.model.js";
import Analytics from "../models/analytics.model.js";
import crypto from "crypto";
const RegisterApi = async (req, res) => {
    try {
        const { name, targetUrl, rateLimit, window, cacheEnabled, cacheTTL } = req.body;

        if (!name || !targetUrl || !rateLimit) {
            return res.status(400).json({
                message: "Name, originalUrl and rateLimit are required",
                success: false
            });
        }

        const proxyId = crypto.randomUUID();
        const apiKey = `sk_live_${crypto.randomBytes(24).toString("hex")}`;
        const api = await Api.create({
            name,
            targetUrl,
            cacheEnabled,
            cacheTTL,
            rateLimit,
            window: window || "1m",
            proxyId,
            apiKey,
            owner: req.user._id
        });

        return res.status(201).json({
            message: "API registered successfully",
            success: true,
            api: {
                id: api._id,
                name: api.name,
                targetUrl: api.targetUrl,
                rateLimit: api.rateLimit,
                window: api.window,
                cacheEnabled: api.cacheEnabled,
                cacheTTL: api.cacheTTL,
                proxyUrl: `${process.env.BASE_URL}/proxy/${api.proxyId}`,
                apiKey: api.apiKey
            }
        });

    } catch (err) {
        console.log("Error in RegisterApi:", err);

        return res.status(500).json({
            message: "Error in registering the API",
            success: false
        });
    }
};


const GetmyApis = async (req, res) => {
    try {
        const apis = await Api.find({ owner: req.user._id }).sort({ createdAt: -1 });

        const result = await Promise.all(
            apis.map(async (api) => {

                const logs = await Analytics.find({ apiId: api._id })
                    .sort({ createdAt: -1 });

                const requests = logs.length;

                const avgLatency =
                    requests === 0
                        ? 0
                        : Math.round(
                            logs.reduce((sum, log) => sum + (log.latency || 0), 0) /
                            requests
                        );

                const lastLog = logs[0];

                let status = "Inactive";

                if (lastLog) {
                    if (lastLog.blocked) {
                        status = "Rate Limited";
                    } else if (lastLog.statusCode >= 500) {
                        status = "Error";
                    } else {
                        status = "Active";
                    }
                }

                return {
                    _id: api._id,
                    name: api.name,
                    targetUrl: api.targetUrl,
                    proxyId: api.proxyId,
                    proxyUrl: `${process.env.BASE_URL}/proxy/${api.proxyId}`,
                    apiKey: api.apiKey,
                    cacheEnabled: api.cacheEnabled,
                    cacheTTL: api.cacheTTL,
                    rateLimit: api.rateLimit,
                    window: api.window,

                    requests,
                    avgLatency,
                    status,
                };
            })
        );

        return res.status(200).json({
            success: true,
            apis: result,
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Error in fetching APIs",
        });

    }
};

const RegenerateApiKey = async (req, res) => {
    try {
        const { id } = req.params;

        const api = await Api.findOne({
            _id: id,
            owner: req.user._id
        });

        if (!api) {
            return res.status(404).json({
                success: false,
                message: "API not found"
            });
        }

        const newApiKey =
            `sk_live_${crypto.randomBytes(24).toString("hex")}`;

        await Api.updateOne(
            {
                _id: id,
                owner: req.user._id
            },
            {
                $set: {
                    apiKey: newApiKey
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "API key regenerated successfully",
            apiKey: newApiKey
        });

    } catch (err) {
        console.error("Error regenerating API key:", err);

        return res.status(500).json({
            success: false,
            message: "Error regenerating API key"
        });
    }
};

const DeleteApi = async (req, res) => {
    try {
        const { id } = req.params;

        const api = await Api.findOne({
            _id: id,
            owner: req.user._id
        });

        if (!api) {
            return res.status(404).json({
                success: false,
                message: "API not found"
            });
        }

        await Api.deleteOne({
            _id: id,
            owner: req.user._id
        });

        await Analytics.deleteMany({
            apiId: id
        });

        return res.status(200).json({
            success: true,
            message: "API deleted successfully"
        });

    } catch (err) {
        console.error("Error deleting API:", err);

        return res.status(500).json({
            success: false,
            message: "Error deleting API"
        });
    }
};


export { RegisterApi, GetmyApis ,RegenerateApiKey , DeleteApi};