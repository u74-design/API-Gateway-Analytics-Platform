import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema(
    {
        apiId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Api",
            required: true
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        proxyId: {
            type: String,
            required: true
        },

        clientIp: {
            type: String
        },

        statusCode: {
            type: Number,
            required: true
        },

        latency: {
            type: Number,
            required: true
        },

        blocked: {
            type: Boolean,
            default: false
        },
        source: {
            type: String,
            enum: ["api", "cache", "rate_limit"],
            default: "api"
        }
    },
    {
        timestamps: true
    }
);

AnalyticsSchema.index({ owner: 1, createdAt: -1 });
AnalyticsSchema.index({ apiId: 1, createdAt: -1 });

const Analytics = mongoose.model("Analytics", AnalyticsSchema);

export default Analytics;
