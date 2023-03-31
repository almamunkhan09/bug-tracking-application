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

export default function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const cookies = req.headers.cookie;
  const prevToken = cookies?.split('=')[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  let secret;
  if (process.env.JWT_SECRET !== undefined) {
    secret = process.env.JWT_SECRET;
  } else {
    throw new Error('Please set a secret value in env file');
  }
  try {
    if (prevToken) {
      // @ts-ignore
      const user: { id: string; isAdmin: boolean } = jwt.verify(
        prevToken,
        secret,
      );
      res.clearCookie(`${user?.id}`);
      req.cookies[`${user.id}`] = '';

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: '30m',
      });
      console.log('Regenerated Token\n', token);
      res.cookie(String(user.id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 30), // 30 m
        httpOnly: true,
        sameSite: 'lax',
      });
      req.user = user;
      next();
    } else {
      return res.status(404).json({ message: 'No token found' });
    }
  } catch (err: any) {
    log.error(err);
    return res.sendStatus(400).json(err.message);
  }
}
