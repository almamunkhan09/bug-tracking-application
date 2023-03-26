import { Request, Response } from 'express';
// import { omit } from 'lodash';
import { userAssociatedProjects, userDataById } from './user-services';

// interface NewUser {
//   name: string;
//   email: string;
//   password: string;
//   profilePicture: string;
// }

export default async function projectByUserId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const userExists = await userDataById(id);

    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const projects = await userAssociatedProjects(id);
    return res.status(200).json(projects);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
