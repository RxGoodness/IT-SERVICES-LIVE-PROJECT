import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Project = new Schema(
  {
    name: {
      type: String,
    },
    overview: { type: String },
    editor: { type: String },
    featuredImage: { type: String },
  },

  { timestamps: true }
);
export default mongoose.model("project", Project);

//Input fields are: Using a react code editor save the project name, project summary, project overview, challenges, goals/objectives, Approach and Methods, results and evaluations, technologies, and images of projects.
