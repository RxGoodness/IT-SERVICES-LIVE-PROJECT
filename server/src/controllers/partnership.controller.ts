// import ParnershipDB from "../models/partnership.schema";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { PartnershipSchema } from "../config/parnership.validator";
import PartnersDB from "../models/partnership.schema";
import { deleteImg } from "../middlewares/process.image";

const requestPartnership = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, logo: req.file!.path };
    await PartnershipSchema.validateAsync(data);
    const partnershipRequest = await PartnersDB.create(data);
    res.status(200).json(partnershipRequest);
  } catch (err: any) {
    deleteImg(req.file!.filename);
    res.status(400);
    throw new Error(err.message);
  }
});

export { requestPartnership };
