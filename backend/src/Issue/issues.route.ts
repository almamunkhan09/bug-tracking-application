import { Router } from 'express';
import createIssue from './createIssue';
import deleteIssue from './deleteIssueHandler';
import getIssueByIssueId from './getIssueByIssueId';
import updateIssue from './updateIssueHandler';

export const issues = Router();

issues.post('/', createIssue);
issues.get('/:issueId', getIssueByIssueId);
issues.put('/:issueId', updateIssue);
issues.delete('/:issueId', deleteIssue);
