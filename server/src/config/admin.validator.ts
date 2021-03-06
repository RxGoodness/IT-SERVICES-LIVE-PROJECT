import Joi from "joi";

const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const PasswordError =
  "Password must be at least 8 character, include uppercase, lowercase, digit and special character.";

const AdminJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().message("Enter valid email").required(),
  password: Joi.string().regex(PasswordRegex).message(PasswordError).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  phone: Joi.string()
    .min(11)
    .max(13)
    .regex(/^[0-9]+$/)
    .message("Enter valid phone number")
    .required(),
  location: Joi.string(),
  about: Joi.string(),
});

const AdminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(PasswordRegex).message(PasswordError).required(),
});

const changePasswordValidator = Joi.object({
  currentPassword: Joi.string()
    .regex(PasswordRegex)
    .message(PasswordError)
    .required(),
  newPassword: Joi.string()
    .regex(PasswordRegex)
    .message(PasswordError)
    .required(),
  confirmNewPassword: Joi.string().required().valid(Joi.ref("newPassword")),
});

type AdminType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  location: string;
  about: string;
};

type LoginType = {
  email: string;
  password: string;
};

type changePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export {
  AdminJoiSchema,
  AdminLoginSchema,
  changePasswordValidator,
  AdminType,
  LoginType,
  changePasswordType,
};
