import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { sendEmail } from "../utils";
import { quoteSchema } from "../config/quote.validator";


export const quote = asyncHandler(
  async (req: Request, res: Response) => {

    const { name, quote, technologies, projectDescription, clientEmail } = req.body;

    //validate req.body
    await quoteSchema.validateAsync(req.body);

    const quoteStr = `Hello, ${name}, the technologies you are applying for are ${technologies} for your project ${projectDescription} and the price range of those technologies are ${quote}`;


    if (!clientEmail.includes("@")) {
      res.status(400);
      throw new Error("Please enter a valid email address")
    }

    await sendEmail(clientEmail, "Your Quote Request", quoteStr);
    res.status(201).json({ message: "quotes sent successfully" });

  }
)
