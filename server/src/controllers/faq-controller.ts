import { Request, Response } from "express";
import faqModel from "../models/faq-models";
import asyncHandler from "express-async-handler";

import Joi from 'joi'

export const allFaqs = async (_req: Request, res: Response) => {
  let allFaqs = await faqModel.find({})
  res.status(200).json(allFaqs);
};

const schema = Joi.object({
  questions: Joi.string().min(10).required(),
  answers: Joi.string(),
  isAnswered: Joi.boolean().default(false)
})


export const createFaqs = asyncHandler(
  async (req: Request, res: Response) => {
    try {

      const { questions, answers } = req.body
      await schema.validateAsync(req.body);

      // console.log("this is it: ",authenticatedInput)
      let newEntry = new faqModel({
        questions,
        answers
      });

      await newEntry.save()

      res.status(201).json({ newEntry })

    } catch (error) {
      res.status(404);
      throw new Error("Question couldn't be added at this time")
    }

  }
)



export const updateFaq = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const questionID = req.params.id;


      const { questions, answers } = req.body;
      const faq = await faqModel.findOneAndUpdate(
        { id: questionID },
        { questions: questions, answers: answers }
      );

      const updatedFaq = await faqModel.find({ _id: faq.id })
      res.status(200).json({ updatedFaq });
    } catch (error) {
      res.status(404);
      throw new Error("Requested ID not found");
    }
  }
)


export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const questionID = req.params.id;

    const deleted = await faqModel.findByIdAndDelete({ _id: questionID })
    deleted.deletedCount
      ? res.status(200).json({ message: "Deleted successfully" })
      : res.status(404).json({ message: "Already deleted" });
  } catch (error) {
    res.status(404);
    throw new Error("Requested ID not found");
  }
};
