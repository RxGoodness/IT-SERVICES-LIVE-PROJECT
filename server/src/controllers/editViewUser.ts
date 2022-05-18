import { Request, Response, NextFunction } from "express";
import AdminDB from "../models/admin.schema";
import asyncHandler from "express-async-handler";

const viewProfile = asyncHandler(async (req: Request, res: Response) => {
  let email = req.query.email;

  // Exclude password from the result
  const user = await AdminDB.findOne({ email }).select("-password");

  // CHECK IF USER EXIST
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ msg: "User not found!" });
  }
});

const editProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let email = req.query.email;
    const user = await AdminDB.findOne({ email });

    // CHECK IF USER EXIST BEFORE UPDATING PROFILE
    if (!user) {
      res.status(404).json({ msg: "User does not exist!" });
    } else {
      await AdminDB.findOneAndUpdate({ email }, req.body, { new: true });
      res.status(200).json({
        msg: "Profile updated successfully!",
      });
    }
  }
);

export { viewProfile, editProfile };
