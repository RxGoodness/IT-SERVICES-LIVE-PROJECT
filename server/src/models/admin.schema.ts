import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Enter valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Enter a password"],
    },
    location: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AdminDB", AdminSchema);
