import Joi from "joi";
import { Request, NextFunction } from "express";
import asyncHandler from "express-async-handler";

const schema = Joi.object({
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  description: Joi.string().required(),
  bestFeature: Joi.string().required(),
  technologies: Joi.string().required(),
  pricePackages: Joi.number().required(),
});

export const validateService = asyncHandler(
  async (req: Request, _res, next: NextFunction) => {
    const { category, subcategory, description, bestFeature, technologies, pricePackages } = req.body;
    const data = { category, subcategory, description, bestFeature, technologies, pricePackages };
    await schema.validateAsync(data, { abortEarly: false });
    next()
  }
)
