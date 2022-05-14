import { Request, Response } from "express";
import faqModel from "../models/faq-models";
import Joi from 'joi'

export const allFaqs = async (_req: Request, res: Response) => {
  let allFaqs = await faqModel.find({})
  res.send(allFaqs);
};

const schema = Joi.object({
  questions: Joi.string().min(10).required(),
  answers: Joi.string(),
  isAnswered: Joi.boolean().default(false)
})


export const createFaqs = async (req: Request, res: Response) => {
  try {

    const {questions, answers} = req.body
  let {error} = schema.validate(req.body)
  if(error) {
    return res.status(400).json({error: error.details[0].message})
  }
  // console.log("this is it: ",authenticatedInput)
  let newEntry =  new faqModel({
    questions,
    answers
  });

  await newEntry.save()

  return res.status(201).json({newEntry})

  } catch (error) {
      res.status(404).json({message: "Question couldn't be added at this time"})
  }
  
};


export const updateFaq = async (req: Request, res: Response) => {
  try {
    const questionID = req.params.id;

    
     const { questions, answers} = req.body;
    const faq = await faqModel.findOneAndUpdate(
      { id: questionID },
      { questions: questions, answers: answers }
    );

    const updatedFaq = await faqModel.find({_id:faq.id})
    res.status(200).json({ updatedFaq });
  } catch (error) {
    res.status(404).json({ message: "Requested ID not found" });
  }
};

export const deleteFaq = async (req: Request, res: Response) => {
    try {
      const questionID = req.params.id;
     
      const deleted = await faqModel.findByIdAndDelete({_id: questionID})
      deleted.deletedCount
        ? res.status(200).json({ message: "Deleted successfully" })
        : res.status(404).json({ message: "Already deleted" });
    } catch (error) {
      res.status(404).json({ message: "Requested ID not found" });
    }
  };


