import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// import { omit } from 'lodash';
import prisma from '../../prisma';
import log from '../utils/logger';

dotenv.config(); // Configure the dotenv for using enviornment variable

interface User {
  email: string;
  password: string;
}

export default async function userLogin(req: Request, res: Response) {
  const { email, password }: User = req.body;
  let secret;
  if (process.env.JWT_SECRET !== undefined) {
    secret = process.env.JWT_SECRET;
  } else {
    throw new Error('Please set a SECRET variable in the env file');
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: 'Email or Password does not match',
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: 'Email or Password does not match',
      });
    }

    const accessTocken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      secret,
      { expiresIn: '1hr' },
    );
    const loginData = {
      id: user.id,
      isAdmin: user.isAdmin,
      name: user.name,
    };
    console.log('Generate Token\n', accessTocken);
    if (req.cookies[loginData.id]) {
      req.cookies[loginData.id] = ' ';
    }
    res.cookie(String(user.id), accessTocken, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      sameSite: 'lax',
    });
    res.status(200).json(loginData);
  } catch (err: any) {
    log.error(err);
    return res.sendStatus(409).json(err.message);
  }
}
