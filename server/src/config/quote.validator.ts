import Joi from "joi";

const quoteSchema = Joi.object({
    name: Joi.string().required(),
    quote: Joi.number().required(),
    technologies: Joi.string().required(),
    projectDescription: Joi.string().required(),
    clientEmail: Joi.string().email().message("Enter valid email").required()
  });

export { quoteSchema };
