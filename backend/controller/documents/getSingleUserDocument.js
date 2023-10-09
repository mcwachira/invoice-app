import asyncHandler from "express-async-handler";
import Document from "../../models/documentModel.js";

// $-title   Get a Single document belonging to a User
// $-path    GET /api/v1/document/:id
// $-auth    Private

const getSingleUserDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);
  // console.log(document);

  const user = req.user._id;

  if (!document) {
    res.status(204);
    throw new Error("Document not found");
  }

  if (document.id !== user) {
    res.status(200).json({
      success: true,
      document,
    });
  } else {
    res.status(401);
    throw new Error(
      "You are not authorized to view this document's information. it is not your document"
    );
  }
});

export default getSingleUserDocument;
