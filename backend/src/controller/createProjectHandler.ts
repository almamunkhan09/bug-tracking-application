import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import prisma from '../../prisma';

// import log from '../utils/logger';

dotenv.config(); // Configure the dotenv for using enviornment variable

interface NewProject {
  title: string;
  description?: string;
  createdById: string;
  maintainerIds: string[];
}

export default async function createProject(req: Request, res: Response) {
  const { title, description, createdById, maintainerIds }: NewProject =
    req.body;

  try {
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        createdBy: {
          connect: {
            id: createdById,
          },
        },
        maintainers: {
          connect: maintainerIds.map((userId: string) => ({ id: userId })),
        },
      },
      include: {
        createdBy: true,
        maintainers: true,
      },
    });

    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
