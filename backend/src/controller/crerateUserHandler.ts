import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import prisma from '../../prisma';
import log from '../utils/logger';

dotenv.config(); // Configure the dotenv for using enviornment variable

interface NewUser {
  name: string;
  email: string;
  password: string;
}

export default async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const newUser: NewUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    let saltValue: number;
    if (process.env.SALT !== undefined) {
      saltValue = parseInt(process.env.SALT);
    } else {
      throw new Error('Please set a salt in the env file');
    }

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
      select: {
        email: true,
      },
    });
    if (isUserExist) {
      return res.status(400).json({
        err: 'Email is already in use',
      });
    }

    const salt = await bcrypt.genSalt(saltValue);
    const hash = bcrypt.hashSync(newUser.password, salt);
    newUser.password = hash;

    const result = await prisma.user.create({
      data: newUser,
    });
    const createdUser = omit(result, 'password');

    return res.status(200).json(createdUser);
  } catch (err) {
    log.error(err);
    return res.sendStatus(409).json(err.message);
  }
}
