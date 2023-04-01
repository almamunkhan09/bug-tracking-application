import { Request, Response } from 'express';
import { allIssues } from './issue-services';

export default async function getAllIssueHandler(req: Request, res: Response) {
  console.log('All');
  console.log(req.user);
  try {
    if (!req.user.isAdmin) {
      return res.status(404).json({ err: 'Not Alllowed to do this action ' });
    }
    const result = await allIssues();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
