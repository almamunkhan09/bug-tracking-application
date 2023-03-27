import joi from 'joi';

export const issueSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  status: joi.string().required(),
  priority: joi.string().required(),
  reporterId: joi.string().required(),
  assigneeIds: joi.string().required(),
  relatedProjectIds: joi.string().required(),
});

export const updateIssueSchema = joi.object({
  title: joi.string(),
  description: joi.string(),
  status: joi.string(),
  priority: joi.string(),
  assigneeIds: joi.string(),
});
