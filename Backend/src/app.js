import express from 'express';
import cors  from 'cors';
import authRoutes from './routes/auth.route.js';
import apiRoutes from "./routes/api.route.js";
import proxyRoutes from "./routes/proxy.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import mongoose from "mongoose";
const app = express();

app.disable("x-powered-by");
app.set("trust proxy", process.env.TRUST_PROXY === "true" ? 1 : false);
app.use(cors({
    origin: process.env.FRONTEND_ORIGINS?.split(",").map((origin) => origin.trim()) || false,
    credentials: true,
}));

app.get('/health', async (_req, res) => {
    res.status(mongoose.connection.readyState === 1 ? 200 : 503).json({
        status: mongoose.connection.readyState === 1 ? "ok" : "degraded",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    });
});

// Keep the proxy body untouched so it can forward JSON, form-data, and binary requests.
app.use('/proxy', proxyRoutes);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/auth',authRoutes);
app.use('/api/apis/',apiRoutes);
app.use("/api/analytics",analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get('/',(req,res)=>{
    res.send("API Gateway Running in backend");
})
app.use((err, _req, res, _next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({ success: false, message: "Invalid JSON request body" });
    }
    console.error("Unhandled application error", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
});
export default app;
