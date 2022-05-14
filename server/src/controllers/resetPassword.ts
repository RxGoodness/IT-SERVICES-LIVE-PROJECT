import User from "../models/admin.schema";
import { sendEmail } from "../utils";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resetPasswordSchema } from "../config/resetPasswordJoiSchema";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcryptjs";

const enterEmail = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    //validate the input from postman
    const schema = Joi.object({ email: Joi.string().email().required() });
    await schema.validateAsync(req.body);

    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).json({ msg: "user with given email doesn't exist" });

    //create one time secrete
    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

    //create token
    const webToken = jwt.sign({ user }, secret, { expiresIn: "15m" });
    console.log(webToken);

    const link = `${process.env.BASE_URL}/reset-password/${user._id}/${webToken}`;
    await sendEmail(user.email, "Password Reset", link);

    res.status(200).json({ msg: "password reset link sent to your email account" });
  }
)

const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
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
    if (password !== reEnterPassword)
      throw new Error("Password mismatch");

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ msg: user });
  }
)

export { enterEmail, resetPassword };
