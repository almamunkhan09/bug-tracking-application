import { Request, Response } from 'express';
// import { omit } from 'lodash';
import prisma from '../../prisma';

// interface NewUser {
//   name: string;
//   email: string;
//   password: string;
//   profilePicture: string;
// }

export default async function projectById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        createdBy: true,
        maintainers: true,
      },
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.status(200).json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
