import User from "../models/admin.schema";
import { sendEmail } from "../utils";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resetPasswordSchema } from "../config/resetPasswordJoiSchema";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcryptjs";
import Activity from "../models/activity";

const enterEmail = asyncHandler(async (req: Request, res: Response) => {
  //validate the input from postman
  const schema = Joi.object({ email: Joi.string().email().required() });
  await schema.validateAsync(req.body);

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400);
    throw new Error("user with given email doesn't exist");
  }

  //create one time secrete
  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

  //create token
  const webToken = jwt.sign({ user }, secret, { expiresIn: "15m" });

  const link = `${process.env.BASE_URL}/reset-password/${user._id}/${webToken}`;
  await sendEmail(user.email, "Password Reset", link);

//RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: `A password reset link was sent to an email succesfully`,
  author:'Admin',
  authorActivityTitleOrName: user.email
  }
 ) 
const savedActivity = await newActivity.save();


  res
    .status(200)
    .json({ msg: "password reset link sent to your email account" });
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  //grab the id and token from req.params
  const { userId, token } = req.params;
  const { password, reEnterPassword } = req.body;

  //check if the userid is valid
  const user = await User.findOne({ _id: userId });
  if (!user) throw new Error("Invalid user");

  //verify the token
  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
  const payload = jwt.verify(token, secret);

  //validate password with joi
  await resetPasswordSchema.validateAsync(req.body);

  //check if password and re-enter password match
  if (password !== reEnterPassword) throw new Error("Password mismatch");

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  await user.save();

//RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: `A password reset was done succesfully`,
  author:'Admin',
  authorActivityTitleOrName: user.email
  }
 ) 
const savedActivity = await newActivity.save();


  res.status(200).json({ msg: user });
});

export { enterEmail, resetPassword };
