// import bcrypt from 'bcrypt';
// import * as dotenv from 'dotenv';
// import { NextFunction, Request, Response } from 'express';
// import { omit } from 'lodash';
// import prisma from '../../prisma';
// import log from '../utils/logger';

// dotenv.config(); // Configure the dotenv for using enviornment variable

// interface NewUser {
//   name: string;
//   email: string;
//   password: string;
//   profilePicture: string;
// }
// const generateHashPawword = async (rawpassword: string) => {
//   let saltValue: number;
//   if (process.env.SALT !== undefined) {
//     saltValue = parseInt(process.env.SALT);
//   } else {
//     throw new Error('Please set a salt in the env file');
//   }

//   const salt = await bcrypt.genSalt(saltValue);
//   return bcrypt.hashSync(rawpassword, salt);
// };

// export default async function updateUser(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const userId: string = req.body.userId;
//     const existedData = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//     });

//     const updateData = {
//       name: req.body.name ? req.body.name.trim() : existedData?.name,
//       password: req.body.password
//         ? generateHashPawword(req.body.password.trim())
//         : existedData?.password,
//       // profilePicture: req.body.password ? req.body.password.trim() : existedData.profilePicture,
//     };

//     // if (isUserExist) {
//     //   return res.status(400).json({
//     //     err: 'Email is already in use',
//     //   });
//     // }

//     const result = await prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: updateData,
//     });

//     // return res.status(200).json(createdUser);
//   } catch (err) {
//     log.error(err);
//     return res.sendStatus(409).json(err.message);
//   }
// }

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
// import { omit } from 'lodash';
import prisma from '../../prisma';
import log from '../utils/logger';

dotenv.config();

interface NewUser {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
}

const generateHashPassword = async (rawPassword: string) => {
  const saltValue = parseInt(process.env.SALT ? process.env.SALT : '10');
  const salt = await bcrypt.genSalt(saltValue);
  return bcrypt.hash(rawPassword, salt);
};

export default async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
  } catch (err) {
    log.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
}
