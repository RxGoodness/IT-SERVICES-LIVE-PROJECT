import { Response, NextFunction } from 'express';
import Joi from 'joi';
import { unlink } from "fs/promises";
import asyncHandler from "express-async-handler";

const schema = Joi.object({
    title: Joi.string(),
    location: Joi.string(),
    employmentType: Joi.string(),
    description: Joi.string()
});


const validateJobUpdate = asyncHandler(
    async (req: any, res: Response, next: NextFunction) => {
        const validSchema = schema.validate(req.body);

        if (validSchema.error) {
            await unlink(req.file.path);
            res.status(400);
            throw new Error(validSchema.error.details[0].message);
        };

        next();
    }
)


export default validateJobUpdate;
