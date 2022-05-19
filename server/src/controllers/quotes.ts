import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { sendEmail } from "../utils";
import { quoteSchema, sendQuoteSchema } from "../config/quote.validator";
import { Quote } from "../models/quote";
import Activity from "../models/activity";

export const requestQuote = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectName, summary, email } = req.body;

    //validate req.body
    await quoteSchema.validateAsync(req.body);

    // const quoteStr = `Hello, ${name}, the technologies you are applying for are ${technologies} for your project ${projectDescription} and the price range of those technologies are ${quote}`;

    // if (!email.includes("@")) {
    //   res.status(400);
    //   throw new Error("Please enter a valid email address");
    // }

    const newQuote = new Quote({
      projectName: projectName,
      summary: summary,
      email: email,
    });

   const theQuote = await newQuote.save();


     //RECORD ACTIVITY
     const newActivity = new Activity(
      {
      message: `A quote was requested succesfully`,
      author: 'Admin',
      authorActivityTitleOrName: theQuote.projectName,
    authorActivityID:theQuote._id
      }
     ) 
   const savedActivity = await newActivity.save();
  
    res
      .status(201)
      .json({ msg: "Quote request successful", summary: newQuote.summary });

    // await sendEmail(clientEmail, "Your Quote Request", quoteStr);
  },
);

export const sendQuote = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  //find quote by id
  const quote = await Quote.findById(userId);

  await sendQuoteSchema.validateAsync(req.body);

  await sendEmail(quote.email, "Project Quote", req.body.message);

//RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: `A quote was sent succesfully`,
  author: 'Admin',
  authorActivityTitleOrName: quote.projectName,
authorActivityID:quote._id
  }
 ) 
const savedActivity = await newActivity.save();


  res.status(201).json({ msg: "quotes sent successfully" });
  console.log(quote);
});

export const getAllQuotes = asyncHandler(
  async (_req: Request, res: Response) => {
    const quotes = await Quote.find({});

    //RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: `All quotes were viewed succesfully`,
   }
 ) 
const savedActivity = await newActivity.save();


    res.json({ data: quotes });
  },
);
