import { Request, Response } from 'express';
// import { omit } from 'lodash';
import prisma from '../../prisma';

// interface NewUser {
//   name: string;
//   email: string;
//   password: string;
//   profilePicture: string;
// }

export default async function projectByUserId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!userExists) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const projects = await prisma.project.findMany({
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
        createdBy: true,
        maintainers: true,
      },
    });

    res.status(200).json(projects);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
