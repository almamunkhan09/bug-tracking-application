import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import log from '../utils/logger';

dotenv.config();
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export default function varifyUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authTocken = req.headers.authorization?.split(' ')[1];
  let secret;
  if (process.env.JWT_SECRET !== undefined) {
    secret = process.env.JWT_SECRET;
  } else {
    throw new Error('Please set a secret value in env file');
  }

  try {
    if (authTocken) {
      const varifiedUser = jwt.verify(authTocken, secret);
      console.log(varifiedUser);
      req.user = varifiedUser;
      next();
    }
  } catch (err: any) {
    log.error(err);
    return res.sendStatus(400).json(err.message);
  }
}
