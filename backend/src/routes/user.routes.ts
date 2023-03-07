import { Request, response, Response, Router } from 'express';
import { omit } from 'lodash';
import prisma from '../../prisma';
import createUser from '../controller/crerateUserHandler';
import updateUser from '../controller/updateUserHadler';
import { userValidate } from '../middleWares/userInputValidation';

export const users = Router();

users.get('/', async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (err) {
    throw new Error(err);
  }
});

users.post('/signup', userValidate, createUser);

users.put('/update', updateUser);
