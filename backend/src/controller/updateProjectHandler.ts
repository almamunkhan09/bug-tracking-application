import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import prisma from '../../prisma';

// import log from '../utils/logger';

dotenv.config(); // Configure the dotenv for using enviornment variable

interface UpdateProject {
  title: string;
  description?: string;
  maintainerIds: string[];
}

export default async function updateProject(req: Request, res: Response) {
  const { id } = req.params;
  // const { title, description, maintainerIds }: NewProject =

  try {
    const projectExists = await prisma.project.findUnique({
      where: { id },
    });

    if (!projectExists) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    const updateData: UpdateProject = {
      title: req.body.title ? req.body.title : projectExists.title,
      description: req.body.description
        ? req.body.description
        : projectExists.description,
      maintainerIds: req.body.maintainerIds
        ? req.body.maintainerIds
        : projectExists.maintainerIds,
    };

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: updateData.title,
        description: updateData.description,
        maintainers:
          updateData.maintainerIds.length > 0
            ? {
                set: updateData.maintainerIds.map((userId: string) => ({
                  id: userId,
                })),
              }
            : undefined,
      },
      include: {
        createdBy: true,
        maintainers: true,
      },
    });

    res.status(200).json(updatedProject);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
