import { Request, Response } from 'express';
import prisma from '../../prisma';

export default async function getAssignedIssues(req: Request, res: Response) {
  const userId = req.params.userId;

  try {
    const assignedIssues = await prisma.issue.findMany({
      where: {
        assignees: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        reporter: true,
        assignees: true,
        relatedProject: true,
      },
    });

    res.status(200).json(assignedIssues);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
