import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import asyncHandler from "express-async-handler";


// EDIT PROFILE VALIDATION

const editProfileSchema = Joi.object({
    firstname: Joi.string().alphanum().min(2),
    lastname: Joi.string().alphanum().min(2),
    email: Joi.string().email(),
    location: Joi.string().min(2),
    about: Joi.string().min(2),
    imageUrl: Joi.string().min(2)
});


const editProfileValidator = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        await editProfileSchema.validateAsync(req.body);
        next()
    }
)

export default editProfileValidator;