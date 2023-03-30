import { Request, Response } from 'express';
import { issueAssignedTo } from './issue-services';

export default async function getAssignedIssues(req: Request, res: Response) {
  const userId = req.params.userId;

  try {
    const assignedIssues = await issueAssignedTo(userId);

    res.status(200).json(assignedIssues);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
