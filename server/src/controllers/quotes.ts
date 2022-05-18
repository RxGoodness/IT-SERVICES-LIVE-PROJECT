import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { sendEmail } from "../utils";
import { quoteSchema, sendQuoteSchema } from "../config/quote.validator";
import { Quote } from "../models/quote";

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

    await newQuote.save();
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
  res.status(201).json({ msg: "quotes sent successfully" });
  console.log(quote);
});
