import asyncHandler from "express-async-handler";
import Customer from "../../models/customerModel.js";
import Document from "../../models/documentModel.js";

// $-title  Create New Payment
// $-path    POST /api/v1/document/:id/payment
// $-auth    Private

const createDocumentPayment = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  const { datePaid, amountPaid, paymentMethod, additionalInfo } = req.body;

  const payment = {
    paidBy: document.customer.name,
    datePaid,
    amountPaid,
    paymentMethod,
    additionalInfo,
  };

  document.paymentRecords.push(payment);

  await Document.save();

  res.status(201).json({
    success: true,
    message: "Payment has been recoded successfully",
  });
});
