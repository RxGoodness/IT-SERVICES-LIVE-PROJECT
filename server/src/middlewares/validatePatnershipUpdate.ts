import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

const project = Joi.object({
    status: Joi.string().messages({
        name: `should be a string`,
    }).valid('Approved', 'Declined'),
});


export const updatePartnershipValidator = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        await project.validateAsync(req.body, { abortEarly: false });
        next()
    }
)
