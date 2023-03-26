import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { createProject } from './project-services';
import { NewProject } from './project-type';

dotenv.config(); // Configure the dotenv for using enviornment variable

export default async function createProjectHandler(
  req: Request,
  res: Response,
) {
  const projectData: NewProject = {
    title: req.body.title,
    description: req.body.description,
    createdById: req.body.createdById,
    maintainerIds: req.body.maintainerIds,
  };

  try {
    const result = await createProject(projectData);
    const response = {
      ...result,
      message: 'New Project Created Successfully',
    };

    res.status(201).json(response);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}
