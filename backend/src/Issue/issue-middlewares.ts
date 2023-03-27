import { NextFunction, Request, Response } from 'express';
import { issueSchema, updateIssueSchema } from './issue-schema';

export const validateIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await issueSchema.validateAsync(req.body);
    next();
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: 'Input is not valid' });
  }
};

export const validateUpdateIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await updateIssueSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(422).json({ message: 'Input is not valid' });
  }
};
