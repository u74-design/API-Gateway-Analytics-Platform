import mongoose from "mongoose";

const ApiSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        targetUrl: {
            type: String,
            required: true,
            maxlength: 2048,
        },

        rateLimit: {
            type: Number,
            required: true,
            min: 1,
            max: 100000
        },

        window: {
            type: String,
            default: "60s"
        },
        cacheEnabled: {
            type: Boolean,
            default: true,
        },

        cacheTTL: {
            type: Number,
            default: 300,
            min: 1,
            max: 86400
        },
        proxyId: {
            type: String,
            required: true,
            unique: true
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        apiKey: {
            type: String,
            select: false
        },

        apiKeyHash: {
            type: String,
            unique: true,
            sparse: true,
            select: false
        }

    },
    {
        timestamps: true
    }
)

const Api = mongoose.model('Api', ApiSchema);

export default Api;
