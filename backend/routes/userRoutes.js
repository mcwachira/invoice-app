import express from "express";
import getUserProfile from "../controller/user/getUserProfile.js";
import checkAuth from "../middleware/checkAuthMiddleware.js";
import updateUserProfile from "../controller/user/updateUserProfile.js";

const router = express.Router();

router.get("/profile", checkAuth, getUserProfile);
router.patch("/profile", checkAuth, updateUserProfile);

export default router;
