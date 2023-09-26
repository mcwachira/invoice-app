import express from 'express'
import verifyUserEmail from '../controller/auth/verifyEmailController.js';
import registerUser from '../controller/auth/registerController.js';

const router = express.Router()

router.post("/register", registerUser)
router.get("/verify/:emailToken/:userId", verifyUserEmail)

export default router