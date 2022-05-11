import User from "../models/admin.schema";
import { sendEmail } from "../utils";
import { Request, Response } from "express";
import { resetPasswordSchema } from "../config/resetPasswordJoiSchema";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcryptjs";

const enterEmail = async (req: Request, res: Response) => {
  try {
    //validate the input from postman
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    console.log(user);

    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    //create one time secrete
    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

    //create token
    const webToken = jwt.sign({ user }, secret, { expiresIn: "15m" });
    console.log(webToken);

    const link = `${process.env.BASE_URL}/reset-password/${user._id}/${webToken}`;
    await sendEmail(user.email, "Password Reset", link);

    res.send("password reset link sent to your email account");
  } catch (error) {
    if (error) return res.json({ error });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  //grab the id and token from req.params
  const { userId, token } = req.params;
  const { password, reEnterPassword } = req.body;

  //check if the userid is valid
  const user = await User.findOne({ _id: userId });
  if (!user) return res.json({ msg: "Invalid user" });

  //verify the token
  const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
  //   console.log("access-token: ", process.env.ACCESS_TOKEN_SECRET);
  try {
    const payload = jwt.verify(token, secret);
    console.log(payload);

    //validate password with joi
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if password and re-enter password match
    if (password !== reEnterPassword)
      return res.json({ msg: "Password mismatch" });

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();
    return res.json({ msg: user });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.send(error.message);
    }
  }
};

export { enterEmail, resetPassword };
