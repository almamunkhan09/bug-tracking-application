import joi from 'joi';

export const newProjectSchema = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  createdById: joi.string().required(),
  maintainerIds: joi.array().items(joi.string()).required(),
});

export const updateProjectSchema = joi.object({
  title: joi.string(),
  description: joi.string(),
  maintainerIds: joi.array().items(joi.string()),
});
