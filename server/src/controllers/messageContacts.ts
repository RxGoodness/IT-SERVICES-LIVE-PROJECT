import nodemailer from "nodemailer";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

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
    } else {
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

export { sendMail };
