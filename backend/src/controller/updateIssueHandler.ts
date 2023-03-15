import { Request, Response } from 'express';
import prisma from '../../prisma';

interface UpdateIssueData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assigneeIds?: string[];
}

export default async function updateIssue(req: Request, res: Response) {
  const issueId = req.params.issueId;
  const updateData: UpdateIssueData = req.body;

  try {
    const existingIssue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!existingIssue) {
      res.status(404).json({ error: 'Issue not found' });
      return;
    }

    const updatedIssue = await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: {
        title: updateData.title,
        description: updateData.description,
        status: updateData.status,
        priority: updateData.priority,
        assignees: updateData.assigneeIds
          ? {
              set: updateData.assigneeIds.map((userId: string) => ({
                id: userId,
              })),
            }
          : undefined,
      },
      include: {
        reporter: true,
        assignees: true,
        relatedProject: true,
      },
    });

    res.status(200).json(updatedIssue);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
