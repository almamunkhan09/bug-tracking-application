import { Request, Response } from 'express';
import prisma from '../../prisma';

export default async function deleteIssue(req: Request, res: Response) {
  const issueId = req.params.issueId;

  try {
    const existingIssue = await prisma.issue.findUnique({
      where: { id: issueId },
    });
    if (!existingIssue) {
      res.status(404).json({ message: 'Issue not found' });
      return;
    }

    await prisma.issue.delete({
      where: {
        id: issueId,
      },
    });

    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
