import { Request, Response } from 'express';
import { issueByReportedId } from './issue-services';

export default async function getIssuesByReporter(req: Request, res: Response) {
  const reporterId = req.params.reporterId;

  try {
    const issues = await issueByReportedId(reporterId);

    res.status(200).json(issues);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
