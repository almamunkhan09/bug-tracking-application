import { Request, Response } from 'express';
import prisma from '../../prisma';

export default async function getIssueByIssueId(req: Request, res: Response) {
  const issueId = req.params.issueId;

  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: issueId,
      },
      include: {
        reporter: true,
        assignees: true,
        relatedProject: true,
        comments: true,
      },
    });

    if (!issue) {
      res.status(404).json({ error: 'Issue not found' });
      return;
    }

    res.status(200).json(issue);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
