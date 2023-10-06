import express from "express";
import checkAuth from "../middleware/checkAuthMiddleware.js";
import updateDocumentInfo from "../controller/documents/updateDocumentInfo.js";
import createDocument from "../controller/documents/createDocument.js";
import getAllUserDocuments from "../controller/documents/getAllUsersDocuments.js";
import getSingleUserDocument from "../controller/documents/getSingleUserDocument.js";
import deleteDocument from "../controller/documents/deleteDocument.js";

const router = express.Router();

//create a new document at /api/v1/document/create
router.route("/create").post(checkAuth, createDocument);

//get all documents at /api/v1/document/all
router.route("/all").get(checkAuth, getAllUserDocuments);

//get a single  document at /api/v1/document/single
router.route("/:id").get(checkAuth, getSingleUserDocument);

//Update document details /api/v1/document/create
router.route("/:id").patch(checkAuth, updateDocumentInfo);

//delete a document /api/v1/document/create
router.route("/:id").delete(checkAuth, deleteDocument);

export default router;
