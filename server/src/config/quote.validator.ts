import Joi from "joi";

const quoteSchema = Joi.object({
  projectName: Joi.string().required(),
  summary: Joi.string().required(),
  email: Joi.string().email().message("Enter valid email").required(),
});

export { quoteSchema };
