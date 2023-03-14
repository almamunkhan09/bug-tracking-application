import { Request, Response, Router } from 'express';
import prisma from '../../prisma';
import createUser from '../controller/crerateUserHandler';
import deleteUser from '../controller/deleteUserHandler';
import projectByUserId from '../controller/getProjectByUserId';
import updateUser from '../controller/updateUserHadler';
import { userValidate } from '../middleWares/userInputValidation';

export const users = Router();

users.get('/', async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (err: any) {
    throw new Error(err);
  }
});

users.post('/', userValidate, createUser);

users.put('/:id', updateUser);
users.delete('/:id', deleteUser);
users.get('/:id/projects', projectByUserId);
