import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import prisma from '../../prisma';

// import log from '../utils/logger';

dotenv.config(); // Configure the dotenv for using enviornment variable

export default async function deleteProject(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const projectExists = await prisma.project.findUnique({
      where: { id },
    });

    if (!projectExists) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    await prisma.project.delete({
      where: { id },
    });

    res.status(204).json({ message: 'Succesful' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
