import { Router } from 'express';
import createIssueHandler from './issue-create-handler';
import deleteIssueHandler from './issue-delete-handler';
import getIssueByIssueId from './issue-get-by-id';
import { validateIssue, validateUpdateIssue } from './issue-middlewares';
import updateIssueHandler from './issue-update-handler';

export const issues = Router();

issues.post('/', validateIssue, createIssueHandler);
issues.get('/:issueId', getIssueByIssueId);
issues.put('/:issueId', validateUpdateIssue, updateIssueHandler);
issues.delete('/:issueId', deleteIssueHandler);
