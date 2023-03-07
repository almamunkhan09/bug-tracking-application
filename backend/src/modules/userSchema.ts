import joi from 'joi';

export const userSchema = joi.object({
  name: joi.string().required(),

  password: joi.string().required().min(8),

  // repeat_password: joi.ref('password'),

  // access_token: [joi.string(), joi.number()],

  email: joi.string().email().required(),
});
