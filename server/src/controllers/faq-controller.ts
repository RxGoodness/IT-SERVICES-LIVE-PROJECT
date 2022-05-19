import { Request, Response } from "express";
import faqModel from "../models/faq-models";
import asyncHandler from "express-async-handler";
import Joi from "joi";
import Activity from "../models/activity";

export const allFaqs = async (_req: Request, res: Response) => {
  let allFaqs = await faqModel.find({});

//RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: ` FAQs and answers were viewed succesfully`}
 )
const savedActivity = await newActivity.save();


  res.status(200).json(allFaqs);
};

const schema = Joi.object({
  questions: Joi.string().min(10).required(),
  answers: Joi.string(),
  isAnswered: Joi.boolean().default(true),
});

export const createFaqs = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { questions, answers } = req.body;
    await schema.validateAsync(req.body);

    // console.log("this is it: ",authenticatedInput)
    let newEntry = new faqModel({
      questions,
      answers,
    });

    const faQuestion = await newEntry.save()

    //RECORD ACTIVITY
    const newActivity = new Activity(
      {
      message: `A FAQ question and answer was posted succesfully`,
      author: 'Admin',
      authorActivityID:faQuestion._id
      })
   const savedActivity = await newActivity.save();

    res.status(201).json({ newEntry });
  } catch (error) {
    res.status(404).json({ msg: "Question couldn't be added at this time" });
  }
});

export const updateFaq = asyncHandler(async (req: Request, res: Response) => {
  try {
    const questionID = req.params.id;

    const { questions, answers } = req.body;
    const faq = await faqModel.findOneAndUpdate(
      { id: questionID },
      { questions: questions, answers: answers }
    );

    const updatedFaq = await faqModel.find({ _id: faq.id });
    res.status(200).json({ updatedFaq });
  } catch (error) {
    res.status(404).json({ msg: "Requested ID not found" });
  }
});

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const questionID = req.params.id;

    const deleted = await faqModel.findByIdAndDelete({ _id: questionID });
    deleted.deletedCount
      ? res.status(200).json({ message: "Deleted successfully" })
      : res.status(404).json({ message: "Already deleted" });
  } catch (error) {
    res.status(404).json({ msg: "Requested ID not found" });
  }
};
