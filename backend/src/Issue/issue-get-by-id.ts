import { Request, Response } from 'express';
import { issueByIssueId } from './issue-services';

export default async function getIssueByIssueId(req: Request, res: Response) {
  const issueId = req.params.issueId;

  try {
    const issue = await issueByIssueId(issueId);
    if (!issue) {
      res.status(404).json({ error: 'Issue not found' });
      return;
    }

    res.status(200).json(issue);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
