import express from "express";
import getUserProfile from "../controller/user/getUserProfile.js";
import checkAuth from "../middleware/checkAuthMiddleware.js";

const router = express.Router();

router.get("/profile", checkAuth, getUserProfile);

export default router;
