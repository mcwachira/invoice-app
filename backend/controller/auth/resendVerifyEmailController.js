import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerificationToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";

const domainURL = process.env.DOMAIN;

const { randomBytes } = await import("crypto");

// $ title   Resend Email Verification
// $-path POST /api/v1/auth/resend_email_token/
// $-auth Public

const ResendEmailVerificationToken = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error(" An email ,must be provided");
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    res.status(400);
    throw new Error(" We are unable to find a user with that email");
  }

  if (user.isEmailVerified) {
    res.status(400);
    throw new Error(" This account has already been verified. Please Login ");
  }

  let verificationToken = await VerificationToken.findOne({
    _userId: user._id,
  });

  if (verificationToken) {
    await VerificationToken.deleteOne();
  }

  const resentToken = randomBytes(32).toString("hex");

  let emailToken = await new VerificationToken({
    _userId: user._id,
    token: resentToken,
  }).save();

  const emailLink = `${domainURL}/api/v1/auth/verify/${emailToken.token}/${user._id}`;

  const payload = {
    name: user.firstName,
    link: emailLink,
  };

  await sendEmail(
    user.email,
    "Account Verification Token",
    payload,
    "./emails/templates/accountVerification.handlebars"
  );

  res.json({
    success: true,
    message: `${user.firstName}, an email has been send to your accout , please verify within 15 minutes`,
  });
});

export default ResendEmailVerificationToken;
