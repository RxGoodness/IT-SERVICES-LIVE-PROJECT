import mongoose from "mongoose";

const Faq = new mongoose.Schema({
    questions: {
      type: String,
    },
    answers: { 
    type: String 
    },
    isAnswered: { 
        type: Boolean,
        default: false,
    },
  },
);
export default mongoose.model("Faq", Faq);