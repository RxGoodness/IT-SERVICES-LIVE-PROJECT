import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import genToken from "../config/gen.token";
import AdminDB from "../models/admin.schema";
import {
  AdminJoiSchema,
  AdminLoginSchema,
  AdminType,
  LoginType,
} from "../config/admin.validator";

const createAdmin = async (req: Request, res: Response): Promise<any> => {
  const body: AdminType = req.body;
  try {
    await AdminJoiSchema.validateAsync(body);
    const adminExists = await AdminDB.countDocuments();
    if (adminExists)
      return res.status(400).json({ msg: "Login with admin credentials" });
    const { confirmPassword, email, ...data } = body;
    const securedPass = await bcrypt.hash(confirmPassword, 10);
    //create data to the database with the hashed password
    await AdminDB.create({ ...data, email, password: securedPass });
    return res.status(200).json({ token: genToken({ email }) });
  } catch (err: any) {
    console.log(err);
    return res.status(401).json({ msg: err.details[0].message });
  }
};

const loginAdmin = async (req: Request, res: Response): Promise<any> => {
  const body: LoginType = req.body;
  try {
    await AdminLoginSchema.validateAsync(body);
    const { email, password } = body;
    const admin = await AdminDB.findOne({ email });
    //create data to the database with the hashed password
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return res.status(200).json({ token: genToken({ email }) });
    } else {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
  } catch (err: any) {
    console.log(err);
    return res.status(401).json({ msg: err.details[0].message });
  }
};

export { createAdmin, loginAdmin };
