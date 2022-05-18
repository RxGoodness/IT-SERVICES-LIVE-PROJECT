// import ParnershipDB from "../models/partnership.schema";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { PartnershipSchema } from "../config/parnership.validator";
import PartnersDB from "../models/partnership.schema";
import { deleteImg } from "../middlewares/process.image";

import { sendEmail } from "../utils";
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

const updatePartnership = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const id = req.params.id;
  const isExist = await PartnersDB.findById(id)
  if (!isExist) {
    res.status(404).json({ msg: "This user does not exist" })
    return;
  }
  if (status === "Approved") {
    const data = await PartnersDB.findOneAndUpdate({ _id: id }, { status: "Approved" }, {
      new: true,
      runValidators: true,
    })
    const { email, status } = await PartnersDB.findById(id);
    sendEmail(email, "Partnership request", "Your partnership request has been approved")
    res.status(200).json(data)
    return
  }
  if (status === "Declined") {
    const data = await PartnersDB.findOneAndUpdate({ _id: id }, { status: "Declined" }, {
      new: true,
      runValidators: true,
    })
    res.status(200).json(data)
    return
  }
})

const deletePartnership = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const isExist = await PartnersDB.findById(id)
  if (!isExist) {
    res.status(404).json({ msg: "This user does not exist" })
    return;
  }
  await PartnersDB.deleteOne({ _id: id })
  res.status(200).json({ msg: "Deleted Successfully" })
})

const getAllPartnership = asyncHandler(async (_req: Request, res: Response) => {
  const data = await PartnersDB.find({});
  res.status(200).json(data);
});


const getOnePartnership = asyncHandler(async (req: Request, res: Response) => {
  
  try {
    const data = await PartnersDB.findOne({_id: req.params.id})
    res.status(200).json(data);
  } catch (error: any) {
    throw new Error(error || "partnership not found")
  }
});



export { requestPartnership, updatePartnership, deletePartnership, getAllPartnership, getOnePartnership };
