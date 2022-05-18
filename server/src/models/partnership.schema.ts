import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Enter your first name"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Enter valid email"],
    },
    email: {
      type: String,
      required: [true, "Enter a password"],
      unique: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    summary: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PartnersDB", AdminSchema);
