import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JobApplication = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    surname: { type: String, required: true },
    DOB: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    profileLink: { type: String, required: true },
    CV: { type: String },
    coverLetter: { type: String },
    jobAppId: { type: Schema.Types.ObjectId, required: true },
  },

  { timestamps: true }
);
export default mongoose.model("jobApplication", JobApplication);
