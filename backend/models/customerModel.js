import mongoose from "mongoose";
import validator from "validator";

const { randomBytes } = await import("crypto");

const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    accountNo: String,
    vatTinNO: {
      type: Number,
      default: 0,
    },
    city: String,
    address: String,
    country: String,
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
      validate: [
        validator.isMobilePhone,
        "Your Phone number must begin with a '+' , followed by your country coder then actual number e.g +254123456789",
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

customerSchema.pre("save", async function (next) {
  this.accountNo = `CUS-${randomBytes(3).toString("hex").toUpperCase()}`;

  next();
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
