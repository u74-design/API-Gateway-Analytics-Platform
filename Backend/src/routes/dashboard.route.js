import express from "express";
import { GetDashboardStats } from "../controllers/dashboard.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, GetDashboardStats);

export default router;