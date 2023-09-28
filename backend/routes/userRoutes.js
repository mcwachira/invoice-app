import express from "express";
import getUserProfile from "../controller/user/getUserProfile.js";
import checkAuth from "../middleware/checkAuthMiddleware.js";
import updateUserProfile from "../controller/user/updateUserProfile.js";
import deleteMyAccount from "../controller/user/deleteMyAccount.js";
import getAllUsersAccounts from "../controller/user/getAllUsersAccount.js";
import role from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/profile", checkAuth, getUserProfile);
router.patch("/profile", checkAuth, updateUserProfile);
router.delete("/profile", checkAuth, deleteMyAccount);
router.get(
  "/all",
  checkAuth,
  role.checkRole(role.ROLES.Admin),
  getAllUsersAccounts
);

export default router;
