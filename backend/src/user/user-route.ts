import { Request, Response, Router } from 'express';
import prisma from '../../prisma';
import getAssignedIssues from '../Issue/issue-get-by-assignee';
import getIssuesByReporter from '../Issue/issue-get-by-reporter-id';
import refreshToken from '../middleWares/refresh-token';
import varifyUser from '../middleWares/varifyUser';
import createUser from './user-create-handler';
import projectByUserId from './user-created-project-handler';
import deleteUser from './user-delete-handler';
import userInformation from './user-information-handler';
import userLogin from './user-login-handler';
import userLogout from './user-logout';
import { updateValidate, userValidate } from './user-middlewares';
import updateUser from './user-update-handler';

export const users = Router();

users.get('/', async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        profilePicture: true,
        createdAt: true,
      },
    });
    res.status(200).json(allUsers);
  } catch (err: any) {
    throw new Error(err);
  }
});

users.post('/', userValidate, createUser);
users.post('/login', userLogin);
users.post('/logout', userLogout);

users.get('/singleuser', varifyUser, userInformation);
users.get('/refreshtoken', refreshToken, varifyUser, userInformation);

users.put('/:id', updateValidate, varifyUser, updateUser);
users.delete('/:id', varifyUser, deleteUser);
users.get('/:id/projects', projectByUserId);
users.get('/:id/userissues', getIssuesByReporter);
users.get('/:id/assignedIssue', getAssignedIssues);
