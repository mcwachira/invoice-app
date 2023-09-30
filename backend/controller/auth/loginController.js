import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import { systemLogs } from "../../utils/Logger.js";

// $-title   Login User and send email verification link
// $-path    POST /api/v1/auth/login
// $-auth    Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide an email and password");
  }

  const existingUser = await User.findOne({ email }).select("+password");
  console.log(existingUser);

  if (!existingUser || !(await existingUser.comparePassword(password))) {
    res.status(401);
    systemLogs.error("Incorrect Email or password");
    throw new Error("Incorrect Email or Password");
  }

  if (!existingUser.isEmailVerified) {
    res.status(400);
    throw new Error(
      " You are not Verified . Check your email , a verification email has been sent to your account"
    );
  }

  if (!existingUser.active) {
    res.status(400);
    throw new Error(
      " You have been deactivated by the admin and login is impossible. Contact us for inquires"
    );
  }

  if (existingUser && (await existingUser.comparePassword(password))) {
    const accessToken = jwt.sign(
      {
        id: existingUser._id,
        roles: existingUser.roles,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      {
        expiresIn: "10m",
      }
    );

    const newRefreshToken = jwt.sign(
      {
        id: existingUser._id,
        // roles: existingUser.roles,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    const cookies = req.cookies;

    let newRefreshTokenArray = !cookies?.jwt
      ? existingUser.refreshToken
      : existingUser.refreshToken.filter((refT) => refT !== cookies.jwt);

    //removing a refresh token based on this senario
    //1.User logs in , never uses the refresh token and does not log out
    //2.refresh token is stolen
    //3 Reuse detection is needed to clear the refresh token
    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const existingRefreshToken = await User.findOne({
        refreshToken,
      }).exec();

      //detected refresh token reuse
      if (!existingRefreshToken) {
        newRefreshTokenArray = [];
      }
      const options = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      };

      res.clearCookie("jwt", options);
    }

    existingUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await existingUser.save();

    const options = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    };

    res.cookie("jwt", newRefreshToken, options);

    res.json({
      success: true,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      username: existingUser.username,
      provider: existingUser.provider,
      avatar: existingUser.avatar,
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials provided");
  }
});

export default loginUser;
