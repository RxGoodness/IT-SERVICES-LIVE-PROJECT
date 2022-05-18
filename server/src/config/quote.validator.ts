import Joi from "joi";

const quoteSchema = Joi.object({
  projectName: Joi.string().required(),
  summary: Joi.string().required(),
  email: Joi.string().email().message("Enter valid email").required(),
});

const sendQuoteSchema = Joi.object({
  message: Joi.string().required(),
});

export { quoteSchema, sendQuoteSchema };
