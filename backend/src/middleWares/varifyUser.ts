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
  const cookies = req.headers.cookie;
  const authTocken = cookies?.split('=')[1];

  let secret;
  if (process.env.JWT_SECRET !== undefined) {
    secret = process.env.JWT_SECRET;
  } else {
    throw new Error('Please set a secret value in env file');
  }

  try {
    if (authTocken) {
      const varifiedUser = jwt.verify(authTocken, secret);
      req.user = varifiedUser;
      next();
    } else {
      return res.status(404).json({ message: 'No token found' });
    }
  } catch (err: any) {
    log.error(err);
    return res.sendStatus(400).json(err.message);
  }
}
