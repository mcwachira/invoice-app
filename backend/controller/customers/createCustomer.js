import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel.js";

// $-title  CreateCustomer
// $-path    POST /api/v1/customer/create
// $-auth    Private

const createCustomer = asyncHandler(async (req, res) => {
  const { email, name, phoneNumber, vatTinNo, address, city, country } =
    req.body;

  if (!email || !name || !phoneNumber) {
    res.status(400);
    throw new Error(
      "A customer must have at least a name, email  and phone Number"
    );
  }

  const customerExist = await Customer.findOne({ email });

  if (customerExist) {
    res.status(400);
    throw new Error("That customer already exist");
  }

  const newCustomer = new Customer({
    createdBy: req.user._id,
    name,
    email,
    phoneNumber,
    vatTinNo,
    address,
    city,
    country,
  });

  const createdCustomer = await newCustomer.save();

  if (!createdCustomer) {
    res.status(400);
    throw new Error("That customer could not  be created");
  } else {
    res.status(200).json({
      success: true,
      message: `Your Customer named: ${createdCustomer.name}, was created successfully `,
      createdCustomer,
    });
  }
});

export default createCustomer;
