import { Response, NextFunction} from 'express';
import Joi from 'joi';
import { unlink } from "fs/promises";
import { transform } from '../utils';

const schema = Joi.object({
    title: Joi.string(),
    location: Joi.string(),
    employmentType: Joi.string(),
    description: Joi.string()
});


const validateJobUpdate = async (req:any, res:Response, next:NextFunction) => {
    const validSchema = schema.validate(req.body);

    if(validSchema.error) {
        await unlink(req.file.path);
        return res.status(400).json({
            error: transform(validSchema.error.details[0].message),
        });
    }

    return next();
}

export default validateJobUpdate;
