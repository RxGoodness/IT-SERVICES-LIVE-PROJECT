import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import {
  changePasswordType,
  changePasswordValidator,
} from "../config/admin.validator";
import Admin from "../models/admin.schema";

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const data: changePasswordType = req.body;
  const admin = req.user;
  //  validate password entry wit Joi
  await changePasswordValidator.validateAsync(data);
  // check if user logged in isAdmin
  if (!req.user) {
    res.status(401).json({ msg: "you are not authorized" });
  }
  try {
    const { currentPassword, newPassword, confirmNewPassword } = data;
    const validateCurrentPassword = await bcrypt.compare(
      currentPassword,
      admin!.password
    );

    // confirm if credentials entered are valid
    if (validateCurrentPassword && newPassword === confirmNewPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      await Admin.findOneAndUpdate(
        { email: admin!.email },
        { $set: { password: hashedNewPassword } },
        { new: true }
      );

      res.status(200).json("Password changed successfully");
    }
  } catch (error) {
    res.status(400).json({ msg: "Error updating password" });
  }
});

export default changePassword;
