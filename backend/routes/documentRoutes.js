import express from "express";
import checkAuth from "../middleware/checkAuthMiddleware.js";
import updateDocumentInfo from "../controller/documents/updateDocumentInfo.js";
import createDocument from "../controller/documents/createDocument.js";
import getAllUserDocuments from "../controller/documents/getAllUsersDocuments.js";
import getSingleUserDocument from "../controller/documents/getSingleUserDocument.js";
import deleteDocument from "../controller/documents/deleteDocument.js";

import {
  generatePDF,
  getPDF,
  sendDocument,
} from "../controller/documents/generatePdf.js";
import createDocumentPayment from "../controller/documents/createPayment.js";

const router = express.Router();

//create a new document at /api/v1/document/create
router.route("/create").post(checkAuth, createDocument);

//get all documents at /api/v1/document/all
router.route("/all").get(checkAuth, getAllUserDocuments);

//create document payment

router.route("/:id/payment").post(checkAuth, createDocumentPayment);

//get a single  document at /api/v1/document/single
router.route("/:id").get(checkAuth, getSingleUserDocument);

//Update document details /api/v1/document/create
router.route("/:id").patch(checkAuth, updateDocumentInfo);

//delete a document /api/v1/document/create
router.route("/:id").delete(checkAuth, deleteDocument);

// generate PDF document at /api/v1/document/generate-pdf
router.route("/generate-pdf").post(generatePDF);
// get pdf at /api/v1/document/get-pdf
router.route("/get-pdf").get(getPDF);
// send email with pdf at /api/v1/document/send-document
router.route("/send-pdf").post(sendDocument);

export default router;
