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


const GetRequestsOverTime = async (req, res) => {
    try {

        const userId = req.user._id;

        const logs = await Analytics.find({ owner: userId })
            .sort({ createdAt: 1 });

        const grouped = {};

        logs.forEach((log) => {

            const date = log.createdAt.toISOString().split("T")[0];

            grouped[date] = (grouped[date] || 0) + 1;

        });

        const result = Object.keys(grouped).map((date) => ({
            date,
            requests: grouped[date]
        }));

        return res.status(200).json({
            success: true,
            requests: result
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "Unable to fetch requests over time"
        });

    }
};


const GetStatusDistribution = async (req, res) => {
    try {

        const userId = req.user._id;

        const logs = await Analytics.find({ owner: userId });

        let success = 0;
        let client = 0;
        let server = 0;

        logs.forEach((log) => {

            if (log.statusCode >= 200 && log.statusCode < 300) {
                success++;
            } else if (log.statusCode >= 400 && log.statusCode < 500) {
                client++;
            } else if (log.statusCode >= 500) {
                server++;
            }

        });

        return res.status(200).json({
            success: true,
            statusDistribution: [
                {
                    name: "2xx Success",
                    value: success,
                },
                {
                    name: "4xx Client",
                    value: client,
                },
                {
                    name: "5xx Server",
                    value: server,
                },
            ],
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "Unable to fetch status distribution",
        });

    }
};

export { GetDashboardStats ,  GetRequestsOverTime, GetStatusDistribution};