import { Router } from 'express';
import projectById from './project-by-prject-id-handler';
import createProject from './project-create-handler';
import deleteProject from './project-delete-handler';
import updateProject from './project-update-handler';

export const projects = Router();

projects.get('/:id', projectById);
projects.post('/', createProject);
projects.put('/:id', updateProject);
projects.delete('/:id', deleteProject);
