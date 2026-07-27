import Api from "../models/api.model.js";
import Analytics from "../models/analytics.model.js";

const GetDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalApis = await Api.countDocuments({ owner: userId });

        const logs = await Analytics.find({ owner: userId });

        const totalRequests = logs.length;

        const blockedRequests = logs.filter(log => log.blocked === true).length;

        const cacheHits = logs.filter(log => log.source === "cache").length;

        const apiCalls = logs.filter(log => log.source === "api").length;

        const rateLimitBlocks = logs.filter(log => log.source === "rate_limit").length;

        const totalLatency = logs.reduce((sum, log) => {
            return sum + (log.latency || 0);
        }, 0);

        const averageLatency =
            totalRequests === 0 ? 0 : totalLatency / totalRequests;

        const cacheHitRatio =
            totalRequests === 0 ? 0 : (cacheHits / totalRequests) * 100;

        return res.status(200).json({
            message: "Dashboard stats fetched successfully",
            success: true,
            stats: {
                totalApis,
                totalRequests,
                blockedRequests,
                cacheHits,
                apiCalls,
                rateLimitBlocks,
                averageLatency,
                cacheHitRatio
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error fetching dashboard stats",
            success: false
        });
    }
};

export { GetDashboardStats };