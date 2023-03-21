import { Request, Response } from 'express';
import { deleteProject, getProject } from './project-services';

// import log from '../utils/logger';

export default async function deleteProjectHandler(
  req: Request,
  res: Response,
) {
  const { id } = req.params;

  try {
    const projectExists = await getProject(id);

    if (!projectExists) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const result = await deleteProject(id);
    const response = {
      ...result,
      message: 'Deleted Project',
    };
    return res.status(204).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
