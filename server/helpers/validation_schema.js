const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match. Please try again" }),
  name: Joi.string().required(),
  breed: Joi.string().required(),
  age: Joi.number().required(),
  picture: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

const hangoutSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  userId: Joi.array().items(Joi.string()),
});

module.exports = {
  authSchema,
  loginSchema,
  hangoutSchema,
};
