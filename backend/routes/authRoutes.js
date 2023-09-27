import express from "express";
import verifyUserEmail from "../controller/auth/verifyEmailController.js";
import registerUser from "../controller/auth/registerController.js";
import loginUser from "../controller/auth/loginController.js";
import { loginLimiter } from "../middleware/apiLimiter.js";
import newAccessToken from "../controller/auth/refreshTokenController.js";
import ResendEmailVerificationToken from "../controller/auth/resendVerifyEmailController.js";
import {
  resetPassword,
  resetPasswordRequest,
} from "../controller/auth/passwordResetController.js";
import logoutUser from "../controller/auth/logoutController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:emailToken/:userId", verifyUserEmail);

router.post("/login", loginLimiter, loginUser);
router.get("/new_access_token", newAccessToken);
router.post("/resend_email_token", ResendEmailVerificationToken);
router.post("/reset_password_request", resetPasswordRequest);
router.post("/reset_password", resetPassword);

router.get("/logout", logoutUser);

export default router;
