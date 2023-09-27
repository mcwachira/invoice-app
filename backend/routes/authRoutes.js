import express from "express";
import verifyUserEmail from "../controller/auth/verifyEmailController.js";
import registerUser from "../controller/auth/registerController.js";
import loginUser from "../controller/auth/loginController.js";
import { loginLimiter } from "../middleware/apiLimiter.js";
import newAccessToken from "../controller/auth/refreshTokenController.js";
import ResendEmailVerificationToken from "../controller/auth/resendVerifyEmailController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:emailToken/:userId", verifyUserEmail);

router.post("/login", loginLimiter, loginUser);
router.get("/new_access_token", newAccessToken);
router.post("/resend_email_token", ResendEmailVerificationToken);

export default router;
