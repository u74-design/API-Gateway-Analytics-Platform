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
        },

        rateLimit: {
            type: Number,
            required: true
        },

        window: {
            type: String,
            default: "1m"
        },
        cacheEnabled: {
            type: Boolean,
            default: true,
        },

        cacheTTL: {
            type: Number,
            default: 300,
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
            required: true,
            unique: true
        }

    },
    {
        timestamps: true
    }
)

const Api = mongoose.model('Api', ApiSchema);

export default Api;