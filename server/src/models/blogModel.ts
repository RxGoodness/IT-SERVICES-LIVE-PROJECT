import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    
    category: {
      type: String,
      required: true},

    username: {
        type: String,
      },
  
    comments:{ 
       name: String,
      email:String,
      comment: String,
    } 
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
