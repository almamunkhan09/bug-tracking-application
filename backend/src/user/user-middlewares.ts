import { NextFunction, Request, Response } from 'express';
import { userSchema, userUpdateSchema } from './user-schema';

export const userValidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: 'User input is not valid' });
  }
};

export const updateValidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await userUpdateSchema.validateAsync(req.body); // Not getting error message instead throw an error
    next();
  } catch (err) {
    res.status(422).json({ message: 'User input is not valid' });
  }
};
