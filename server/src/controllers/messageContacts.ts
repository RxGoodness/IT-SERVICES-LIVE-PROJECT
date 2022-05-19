import nodemailer from "nodemailer";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Activity from "../models/activity";

const sendMail = asyncHandler(async (req: Request, res: Response) => {
  const { from, to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      res.status(400).json({ msg: "Email not sent" });
    } 
    else {

             //RECORD ACTIVITY
              const newActivity = new Activity(
          {
           message: `An email was sent succesfully `,
           author: 'Admin',
           }
          ) 
          const savedActivity =  newActivity.save();


      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

export { sendMail };
