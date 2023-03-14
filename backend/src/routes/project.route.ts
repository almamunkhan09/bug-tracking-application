import { Router } from 'express';
import createProject from '../controller/createProjectHandler';
import deleteProject from '../controller/deleteProjectHandler';
import projectById from '../controller/getProjectByProjectId';
import updateProject from '../controller/updateProjectHandler';

export const projects = Router();

projects.get('/:id', projectById);
projects.post('/', createProject);
projects.put('/:id', updateProject);
projects.delete('/:id', deleteProject);
