import { Request, Response } from "express";
import { sendEmail } from "../utils";
import { quoteSchema } from "../config/quote.validator";


export const quote = async (req: Request, res: Response) => {

  const { name, quote, technologies, projectDescription, clientEmail } = req.body;

//validate req.body
  const { error } = quoteSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); 

  const quoteStr = `Hello, ${name}, the technologies you are applying for are ${technologies} for your project ${projectDescription} and the price range of those technologies are ${quote}`;


  try {
  
    if(!clientEmail.includes("@")) {
      return res.json({msg: "Please enter a valid email address"})
    }  
    
    await sendEmail(clientEmail, "Your Quote Request", quoteStr);
    return res.status(201).json({ message: "quotes sent successfully" });
    
  } catch (error) {
    console.error(error);
  
  }
};




