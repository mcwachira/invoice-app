import express from "express";
import createCustomer from "../controller/customers/createCustomer.js";
import deleteCustomer from "../controller/customers/deleteCustomer.js";
import updateCustomerInfo from "../controller/customers/updateCustomerInfo.js";
import getAllUserCustomer from "../controller/customers/getAllUserCustomers.js";
import getSingleUserCustomer from "../controller/customers/getSingleUserCustomer.js";
import checkAuth from "../middleware/checkAuthMiddleware.js";
import { loginLimiter } from "../middleware/apiLimiter.js";

const router = express.Router();

//create a new customer at /api/v1/customer/create
router.route("/create").post(checkAuth, createCustomer);

//get all customers at /api/v1/customer/all
router.route("/all").get(checkAuth, getAllUserCustomer);

//get a single  customer at /api/v1/customer/single
router.route("/:id").get(checkAuth, getSingleUserCustomer);

//Update customer details /api/v1/customer/create
router.route("/:id").patch(checkAuth, updateCustomerInfo);

//delete a customer /api/v1/customer/create
router.route("/:id").delete(checkAuth, deleteCustomer);

export default router;
