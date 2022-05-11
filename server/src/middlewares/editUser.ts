import Joi from "joi";
import { Request, Response, NextFunction } from 'express';


// EDIT PROFILE VALIDATION

const editProfileSchema = Joi.object({
    firstname: Joi.string().alphanum().min(2),
    lastname: Joi.string().alphanum().min(2),
    email: Joi.string().email(),
    location: Joi.string().min(2),
    about: Joi.string().min(2),
    imageUrl: Joi.string().min(2)
});


const editProfileValidator = async (req: Request, res: Response, next: NextFunction) => {

      const result =  await editProfileSchema.validate(req.body);
      
      if (result.error) {
          res.status(422).json({
              error: result.error.details[0].message
          })
      } else {
          next()
      }
}




export default editProfileValidator;