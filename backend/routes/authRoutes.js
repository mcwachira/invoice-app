import express from "express";
import verifyUserEmail from "../controller/auth/verifyEmailController.js";
import registerUser from "../controller/auth/registerController.js";
import loginUser from "../controller/auth/loginController.js";
import { loginLimiter } from "../middleware/apiLimiter.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:emailToken/:userId", verifyUserEmail);

router.post("/login", loginLimiter, loginUser);

export default router;
