import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import prisma from '../prisma';
import { NewUser, UpdateData } from './user-types';

dotenv.config();

/**
 * Get the data of user using email  .
 *
 * @param email the email of the user that the data we want .
 * @returns the square object data of user i.e id,email,name and profile picture.
 */

export async function userData(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      profilePicture: true,
    },
  });
}

/**
 * Get the data of user using id  .
 *
 * @param id the user id that the data we want .
 * @returns the square object data of user i.e id,email,name and profile picture.
 */

export async function userDataById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      profilePicture: true,
    },
  });
}

/**
 * Bycrypt hash generator that give hashed password
 *
 * @param password the password provided as input from the user.
 * @returns cryptographic hashed password.
 */

export async function generateHash(password: string): Promise<string> {
  let saltValue: number;
  if (process.env.SALT !== undefined) {
    saltValue = parseInt(process.env.SALT);
  } else {
    throw new Error('Please set a salt in the env file');
  }
  const salt = await bcrypt.genSalt(saltValue);
  return bcrypt.hashSync(password, salt);
}

/**
 * User Signup
 *
 * @param data is name,email,password and/or profile picture url provided by the user.
 * @returns id,email,name,createdAt on succesfull user creation
 */

export async function createUser(data: NewUser) {
  return await prisma.user.create({
    data: data,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });
}

/**
 * Update user data
 *
 * @param id is the user id whose data need to be modified.
 * @param data that need to update in the database
 * @returns id,email,name,profile picture on succesfull update
 */

export async function updateUserData(id: string, data: UpdateData) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
    select: {
      id: true,
      email: true,
      profilePicture: true,
      name: true,
    },
  });
}

/**
 * Delete user
 *
 * @param id is the user id whose data need to be erased
 * @param data that need to update in the database
 * @returns id,email,name,profile picture on succesfull update
 */

export async function deleteUserById(id: string) {
  return await prisma.user.delete({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
}

export async function userAssociatedProjects(id: string) {
  return await prisma.project.findMany({
    where: {
      OR: [
        { createdById: id },
        {
          maintainers: {
            some: {
              id: id,
            },
          },
        },
      ],
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          profilePicture: true,
          email: true,
        },
      },
      maintainers: {
        select: {
          id: true,
          name: true,
          profilePicture: true,
          email: true,
        },
      },
    },
  });
}
