import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { getProjectById, updateProject } from './project-services';
import { UpdateProject } from './project-type';

dotenv.config(); // Configure the dotenv for using enviornment variable

export default async function updateProjectHandler(
  req: Request,
  res: Response,
) {
  const { id } = req.params;
  // const { title, description, maintainerIds }: NewProject =

  try {
    const projectExists = await getProjectById(id);

    if (!projectExists) {
      return res.status(404).json({ error: 'Project not found' });
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

    const result = await updateProject(id, updateData);

    const response = {
      ...result,
      message: 'Update Successful',
    };

    return res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
