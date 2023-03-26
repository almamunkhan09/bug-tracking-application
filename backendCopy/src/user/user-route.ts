import { Request, Response, Router } from 'express';
import prisma from '../../prisma';
import getAssignedIssues from '../Issue/getIssuesAssignedToUser';
import getIssuesByReporter from '../Issue/getIssuesCreatedByUser';
import varifyUser from '../middleWares/varifyUser';
import createUser from './user-create-handler';
import projectByUserId from './user-created-project-handler';
import deleteUser from './user-delete-handler';
import { updateValidate, userValidate } from './user-middlewares';
import updateUser from './user-update-handler';
import userLogin from './userLoginHandler';

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
users.post('/login', userLogin);
users.put('/:id', updateValidate, updateUser);
users.delete('/:id', varifyUser, deleteUser);
users.get('/:id/projects', projectByUserId);
users.get('/:id/userissues', getIssuesByReporter);
users.get('/:id/assignedIssue', getAssignedIssues);
