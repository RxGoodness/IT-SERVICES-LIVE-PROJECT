import { Response, NextFunction } from 'express';
import Joi from 'joi';
import { deleteImg } from './process.image';
import { transform } from '../utils';

const schema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    employmentType: Joi.string().required(),
    description: Joi.string().required()
});

const validateJobFields = (
    async (req: any, res: Response, next: NextFunction) => {
        const validSchema = schema.validate(req.body);

        if(validSchema.error) {
            deleteImg(req.file.filename);
            return res.status(400).json({
                error: transform(validSchema.error.details[0].message),
            });
        }
    
        return next();
    }
)


export default validateJobFields;
