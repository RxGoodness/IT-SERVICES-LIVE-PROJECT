import Joi from "joi";

const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const PasswordError =
  "Password must be at least 8 character, include uppercase, lowercase, digit and special character.";

const resetPasswordSchema = Joi.object({
  password: Joi.string().regex(PasswordRegex).message(PasswordError).required(),
  reEnterPassword: Joi.string().required(),
});

export { resetPasswordSchema };
