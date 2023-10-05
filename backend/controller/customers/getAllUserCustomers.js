import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel.js";

// $-title  Get All Customers Belonging to a  specific user
// $-path    PATCH /api/v1/customers/all
// $-auth    Private

const getAllUserCustomer = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const page = Number(req.query.page) || 1;

  console.log(req.user._id);

  const count = await Customer.countDocuments({ createdBy: req.user._id });

  //find customers belonging to a specific user  in descending order based on the pagerSize
  const customers = await Customer.find({ createdBy: req.user._id })
    .sort({
      createdAt: -1,
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  if (!customers) {
    res.status(404);
    throw new Error("User does not have any customers");
  }

  res.status(200).json({
    success: true,
    totalCustomers: count,
    numberOfPages: Math.ceil(count / pageSize),
    myCustomers: customers,
  });
});

export default getAllUserCustomer;
