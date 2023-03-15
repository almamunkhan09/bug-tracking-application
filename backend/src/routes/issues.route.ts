import { Router } from 'express';
import createIssue from '../controller/createIssue';
import deleteIssue from '../controller/deleteIssueHandler';
import getIssueByIssueId from '../controller/getIssueByIssueId';
import updateIssue from '../controller/updateIssueHandler';

export const issues = Router();

issues.post('/', createIssue);
issues.get('/:issueId', getIssueByIssueId);
issues.put('/:issueId', updateIssue);
issues.delete('/:issueId', deleteIssue);
