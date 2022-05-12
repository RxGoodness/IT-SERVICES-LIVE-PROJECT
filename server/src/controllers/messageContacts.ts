import nodemailer from "nodemailer";
import { Request, Response } from "express";

const sendMail = async (req:Request, res:Response) => {
     
  const {from, to, subject, text} = req.body

  const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.MAIL_USERNAME,
        pass:process.env.MAIL_PASSWORD
      }
    })

  const mailOptions = {
      from:from,
      to:to,
      subject:subject,
      text:text
    }

    transporter.sendMail(mailOptions, function(error){
        if(error){
           return res.status(400).json({message:"An error occured"});
        }else{
           return res.status(200).json({message:"Email sent succesfully"});
        }
    })
}

export {sendMail}

