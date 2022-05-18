import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

const project = Joi.object({
  name: Joi.string().required().messages({
    name: `should be a string`,
  }),
  overview: Joi.string().required().messages({
    overview: `should be a string`,
  }),
  editor: Joi.string().required().messages({
    editor: `should be a string`,
  }),
  featuredImage: Joi.string(),
});

export const projectValidatior = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await project.validateAsync(req.body, { abortEarly: false });
    next();
  }
);
