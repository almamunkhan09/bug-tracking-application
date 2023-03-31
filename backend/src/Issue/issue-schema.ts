import joi from 'joi';

export const issueSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  status: joi.string(),
  priority: joi.string(),
  reporterId: joi.string().required(),
  assigneeIds: joi.array().items(joi.string()),
  relatedProjectId: joi.string().required(),
});

export const updateIssueSchema = joi.object({
  title: joi.string(),
  description: joi.string(),
  status: joi.string(),
  priority: joi.string(),
  assigneeIds: joi.array().items(joi.string()),
});
