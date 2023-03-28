import { Request, Response } from 'express';
import prisma from '../prisma';

export default async function deleteIssue(req: Request, res: Response) {
  const issueId = req.params.issueId;
  console.log(issueId);

  try {
    console.log(issueId);
    const existingIssue = await prisma.issue.findUnique({
      where: { id: issueId },
    });
    console.log(existingIssue);
    if (!existingIssue) {
      res.status(404).json({ error: 'Issue not found' });
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
