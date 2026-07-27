import express from 'express';
import cors  from 'cors';
import authRoutes from './routes/auth.route.js';
import apiRoutes from "./routes/api.route.js";
import proxyRoutes from "./routes/proxy.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials : true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/auth',authRoutes);
app.use('/api/apis/',apiRoutes);
app.use('/proxy', proxyRoutes);
app.use("/api/analytics",analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get('/',(req,res)=>{
    res.send("API Gateway Running in backend");
})

export default app;