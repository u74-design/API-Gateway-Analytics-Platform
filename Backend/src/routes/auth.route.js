import express from 'express';
import { RegisterUser, LoginUser, GetProfile,  changepassword} from "../controllers/auth.controller.js";
import { protectedRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register',RegisterUser);
router.post('/login', LoginUser);
router.get('/profile',protectedRoute,GetProfile);
router.patch("/change-password",protectedRoute, changepassword);
export default router;

