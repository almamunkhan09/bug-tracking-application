import { Request, Response } from 'express';
import prisma from '../../prisma';

export default async function getIssuesByReporter(req: Request, res: Response) {
  const reporterId = req.params.reporterId;

  try {
    const issues = await prisma.issue.findMany({
      where: {
        reporterId,
      },
      include: {
        reporter: { select: { name: true } },
        assignees: { select: { name: true } },
        relatedProject: { select: { title: true } },
      },
    });

    res.status(200).json(issues);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
