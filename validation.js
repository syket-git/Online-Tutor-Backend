const Joi = require('joi');

const signupValidation = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(11).required(),
    gender: Joi.string().required(),
    password: Joi.string().min(6).max(30).required(),
  });

  return schema.validate(body);
};

const signinValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(body);
};

const sscLevelValidation = (body) => {
  const schema = Joi.object({
    ssc_level: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(body);
};
const hscLevelValidation = (body) => {
  const schema = Joi.object({
    hsc_level: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(body);
};
const boardValidation = (body) => {
  const schema = Joi.object({
    board_name: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(body);
};
const groupValidation = (body) => {
  const schema = Joi.object({
    group_name: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(body);
};
const universityValidation = (body) => {
  const schema = Joi.object({
    university_name: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(body);
};

module.exports = {
  signupValidation,
  signinValidation,
  sscLevelValidation,
  hscLevelValidation,
  boardValidation,
  groupValidation,
  universityValidation,
};
