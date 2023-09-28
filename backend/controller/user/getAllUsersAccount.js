import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

// $-title  Get All Users
// $-path    GET/api/v1/user/all
// $-auth    Private/Admin
const getAllUsersAccounts = asyncHandler(async (req, res) => {
  //users too display per page
  const pageSize = 10;

  const page = Number(req.query.pageNumber) || 1;

  //number of all documents
  const count = await User.countDocuments();

  const users = await User.find()
    .sort({ createdAt: -1 })
    .select("-refreshToken")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  res.json({
    success: true,
    count,
    numberOfPages: Math.ceil(count / pageSize),
    users,
  });
});

export default getAllUsersAccounts;
