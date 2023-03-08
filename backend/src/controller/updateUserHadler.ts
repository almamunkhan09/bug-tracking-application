import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
// import { omit } from 'lodash';
import prisma from '../../prisma';
import log from '../utils/logger';

dotenv.config();

// interface NewUser {
//   name: string;
//   email: string;
//   password: string;
//   profilePicture: string;
// }

const generateHashPassword = async (rawPassword: string) => {
  const saltValue = parseInt(process.env.SALT ? process.env.SALT : '10');
  const salt = await bcrypt.genSalt(saltValue);
  return bcrypt.hash(rawPassword, salt);
};

export default async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // const userId = req.body.userId;
    const existedData = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!existedData) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const updateData = {
      name: req.body.name ? req.body.name.trim() : existedData.name,
      password: req.body.password
        ? await generateHashPassword(req.body.password.trim())
        : existedData.password,
      profilePicture: req.body.profilePicture
        ? req.body.profilePicture.trim()
        : existedData.profilePicture,
    };

    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return res.status(200).json(result);
  } catch (err: any) {
    log.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
}
