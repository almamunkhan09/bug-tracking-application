import { NextFunction, Request, Response } from 'express';
import { userSchema } from '../models/userSchema';

type NewUser = {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
};
export const userValidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newUser: NewUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profilePicture: req.body.profilePicture,
  };
  const { error } = await userSchema.validateAsync(newUser);

  if (!error) {
    next();
  } else {
    const { details } = error;
    console.log(details);
    const message = details.map((i: any) => i.message).join(',');

    // console.log('error', message);
    res.status(422).json({ error: message });
  }
};
