import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { FinalError, formatError } from "../utils";

const schema = Joi.object({
  category: Joi.string().required(),
  subcategory: Joi.array().items(Joi.string()).required(),
  description: Joi.string().required(),
  bestFeature: Joi.string().required(),
  technologies: Joi.string().required(),
  pricePackages: Joi.number().required(),
});

export const validateService = async (req: Request, res: Response, next: NextFunction) => {
  const { category, subcategory, subDescription, image, description, bestFeature, technologies, pricePackages } = req.body;

  const data = {
    category,
    subcategory,
    subDescription,
    image,
    description,
    bestFeature,
    technologies,
    pricePackages,
  };
  try {
    await schema.validate(data, {abortEarly: false});
    next();
  } catch (error) {
    const typeEr = error as unknown as FinalError;
    const errRes = formatError(typeEr.details);
    res.status(400).json(errRes);
  }
};

