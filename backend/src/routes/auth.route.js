import express from "express";
import { checkAuth, Login, Logout, SignUp, updateProfile } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", Logout);

router.put("/update-profile", protectedRoute, updateProfile)
router.get("/check", protectedRoute, checkAuth);
export default router; 