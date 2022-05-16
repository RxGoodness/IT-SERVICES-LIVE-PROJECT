import Joi from "joi";

const PartnershipSchema = Joi.object({
  companyName: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().email().message("Enter valid email").required(),
  summary: Joi.string(),
  logo: Joi.string(),
  status: Joi.string().valid("pending", "approved", "declined"),
});

export { PartnershipSchema };
