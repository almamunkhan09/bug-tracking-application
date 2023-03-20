import { Request, Response } from 'express';
// import { omit } from 'lodash';
import { getProjectById } from './project-services';

// interface NewUser {
//   name: string;
//   email: string;
//   password: string;
//   profilePicture: string;
// }

export default async function projectById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await getProjectById(id);
    if (!result) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    const response = {
      ...result,
      message: 'Get the project Successfully',
    };

    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
