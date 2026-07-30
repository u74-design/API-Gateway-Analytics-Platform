import express from "express";
import { GetDashboardStats , GetRequestsOverTime, GetStatusDistribution, GetTopApis, GetRecentActivity} from "../controllers/dashboard.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/stats", protectedRoute, GetDashboardStats);
router.get("/requests-over-time",protectedRoute,GetRequestsOverTime);
router.get("/status-distribution",protectedRoute,GetStatusDistribution);
router.get("/top-apis",protectedRoute,GetTopApis);  
router.get("/recent-activity",protectedRoute, GetRecentActivity);
export default router;  