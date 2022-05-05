import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { formatError, FinalError } from "../utils";

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
});

export const projectValidatior = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await project.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const typeEr = err as FinalError;
    const errRes = formatError(typeEr.details);
    res.status(400).json(errRes);
  }
};
