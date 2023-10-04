import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { morganMiddleware, systemLogs } from "./utils/Logger.js";
import connectToDB from "./config/connectToDb.js";
import mongoSanitize from "express-mongo-sanitize";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { apiLimiter } from "./middleware/apiLimiter.js";
import passport from "passport";
import googleAuth from "./config/passportSetup.js";
await connectToDB();
const app = express();

const PORT = 1997 || process.env.PORT;
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
googleAuth();

app.use(cookieParser());
app.use(mongoSanitize());

app.use(morganMiddleware);

app.get("/api/v1/test", (req, res) => {
  res.json({ Hi: "Welcome to the Invoice App" });
});

//auth routes
app.use("/api/v1/auth", authRoutes);

//user routes
app.use("/api/v1/users", apiLimiter, userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold("app is running in ")} ${chalk.green.yellow(
      process.env.NODE_ENV
    )} mode on port ${chalk.blue.bold(PORT)}`
  );

  systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
