import express from "express";
import { RegisterApi, GetmyApis, RegenerateApiKey, DeleteApi } from "../controllers/api.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/register',protectedRoute, RegisterApi);
router.get('/my-apis',protectedRoute,GetmyApis);
router.patch("/:id/regenerate",protectedRoute,RegenerateApiKey);
router.delete("/:id", protectedRoute, DeleteApi);
export default router;
