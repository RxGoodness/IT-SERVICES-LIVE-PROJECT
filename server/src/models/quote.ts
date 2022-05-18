import { Schema, model } from "mongoose";

const quoteSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

//

export const Quote = model("Quote", quoteSchema);
