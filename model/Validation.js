const Joi = require("@hapi/joi");

const validationLengths = {
  message: {
    min: 6,
    max: 100,
  },
  email: {
    min: 6,
    max: 320,
  },
  password: {
    min: 6,
    max: 30,
  },
};

const registerValidation = data => {
  const schema = Joi.object({
    message: Joi.string()
      .min(validationLengths.message.min)
      .max(validationLengths.message.max)
      .required(),
    email: Joi.string()
      .min(validationLengths.email.min)
      .max(validationLengths.email.max)
      .email()
      .required(),
    password: Joi.string()
      .min(validationLengths.password.min)
      .max(validationLengths.password.max)
      .required(),
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(validationLengths.email.min)
      .max(validationLengths.email.max)
      .email()
      .required(),
    password: Joi.string()
      .min(validationLengths.password.min)
      .max(validationLengths.password.max)
      .required(),
  });
  return schema.validate(data);
};

module.exports = {
  validationLengths,
  registerValidation,
  loginValidation,
};
