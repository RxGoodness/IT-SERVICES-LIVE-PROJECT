import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

const project = Joi.object({
  firstName: Joi.string().required().messages({
    firstName: `should be a string`,
  }),
  surname: Joi.string().required().messages({
    surname: `should be a string`,
  }),
  country: Joi.string().required().messages({
    country: `should be a string`,
  }),
  address: Joi.string().required().messages({
    address: `should be a string`,
  }),
  DOB: Joi.string().required().messages({
    DOB: `should be a string`,
  }),
  email: Joi.string().required().email().messages({
    email: `should be a string`,
  }),
  phone: Joi.string()
    .min(11)
    .max(13)
    .regex(/^[0-9]+$/)
    .message("Enter valid phone number")
    .required(),
  profileLink: Joi.string().required().uri().messages({
    profileLink: `Please enter a valid url`,
  }),
  CV: Joi.string().messages({
    CV: `should be a string`,
  }),
  coverLetter: Joi.string().messages({
    coverLetter: `should be a string`,
  }),
  jobAppId: Joi.string().required().messages({
    jobAppId: `should be a string`,
  }),
});

export const projectValidatior = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await project.validateAsync(req.body, { abortEarly: false });
    next();
  }
);
