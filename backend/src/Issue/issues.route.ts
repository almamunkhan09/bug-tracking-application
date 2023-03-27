import { Router } from 'express';
import deleteIssue from './deleteIssueHandler';
import createIssue from './issue-create-handler';
import getIssueByIssueId from './issue-get-by-id';
import updateIssue from './updateIssueHandler';

export const issues = Router();

issues.post('/', createIssue);
issues.get('/:issueId', getIssueByIssueId);
issues.put('/:issueId', updateIssue);
issues.delete('/:issueId', deleteIssue);
