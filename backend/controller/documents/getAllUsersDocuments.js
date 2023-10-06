import asyncHandler from "express-async-handler";
import Document from "../../models/documentModel.js";

// $-title  Get All Documents Belonging to a  specific user
// $-path    PATCH /api/v1/documents/all
// $-auth    Private

const getAllUserDocuments = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const page = Number(req.query.page) || 1;

  console.log(req.user._id);

  const count = await Document.countDocuments({ createdBy: req.user._id });

  //find documents belonging to a specific user  in descending order based on the pagerSize
  const documents = await Document.find({ createdBy: req.user._id })
    .sort({
      createdAt: -1,
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  if (!documents) {
    res.status(404);
    throw new Error("User does not have any documents");
  }

  res.status(200).json({
    success: true,
    totalDocuments: count,
    numberOfPages: Math.ceil(count / pageSize),
    myDocuments: documents,
  });
});

export default getAllUserDocuments;
