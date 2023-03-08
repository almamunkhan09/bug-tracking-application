import joi, { string } from 'joi';

export const userSchema = joi.object({
  name: joi.string().required(),
  password: joi.string().required().min(8),
  profilePicture: joi.string(),
  email: joi.string().email().required(),
});

export const userUpdateSchema = joi.object({
  name: joi.string(),
  password: joi.string().min(8),
  email: joi.string().email(),
  profilePicture: joi.string(),
});
