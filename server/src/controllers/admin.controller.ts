import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import genToken from "../config/gen.token";
import AdminDB from "../models/admin.schema";
import asyncHandler from "express-async-handler";
import {
  AdminJoiSchema,
  AdminLoginSchema,
  AdminType,
  LoginType,
} from "../config/admin.validator";
import Activity from "../models/activity";


const createAdmin = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const body: AdminType = req.body;
    await AdminJoiSchema.validateAsync(body);
    const adminExists = await AdminDB.countDocuments();
    if (adminExists)
      return res.status(400).json({ msg: "Login with admin credentials" });
    const { confirmPassword, email, ...data } = body;
    const securedPass = await bcrypt.hash(confirmPassword, 10);
    //create data to the database with the hashed password
    const admin = await AdminDB.create({ ...data, email, password: securedPass });
    const token = genToken({ email });

  //RECORD ACTIVITY
  const newActivity = new Activity(
    {
    message: `An admin was created succesfully`,
    author: 'Admin',
    authorActivityTitleOrName: admin.firstName,
    authorActivityID:admin._id
    }
   )
 const savedActivity = await newActivity.save();


    return res.status(200).json({ token });
  }
);

const loginAdmin = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const body: LoginType = req.body;
    await AdminLoginSchema.validateAsync(body);
    const { email, password } = body;
    const admin = await AdminDB.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = genToken({ email });

//RECORD ACTIVITY
const newActivity = new Activity(
  {
  message: `Admin logged in succesfully`,
  author: 'Admin',
  authorActivityTitleOrName: admin.firstName,
  authorActivityID:admin._id
  }
 )  
const savedActivity = await newActivity.save();


      return res.status(200).json({ token });
    } else {
      res.status(401).json({ msg: "Invalid credentials" });
    }
  }
);

export { createAdmin, loginAdmin };
