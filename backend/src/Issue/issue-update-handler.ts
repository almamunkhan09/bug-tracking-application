import { Request, Response } from 'express';
import prisma from '../../prisma';
import { updateIssue } from './issue-services';

interface UpdateIssueData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assigneeIds?: string[];
}

export default async function updateIssueHandler(req: Request, res: Response) {
  const issueId = req.params.issueId;

  try {
    const existingIssue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!existingIssue) {
      res.status(404).json({ error: 'Issue not found' });
      return;
    }
    const updateData: UpdateIssueData = {
      title: req.body.title ? req.body.title : existingIssue.title,
      description: req.body.description
        ? req.body.description
        : existingIssue.description,
      status: req.body.status ? req.body.status : existingIssue.status,
      priority: req.body.priority ? req.body.priority : existingIssue.priority,
      assigneeIds: req.body.assigneeIds
        ? req.body.assigneeIds
        : existingIssue.assigneeIds,
    };

    const result = await updateIssue(issueId, updateData);
    const response = {
      ...result,
      message: 'Issue updated Succefully',
    };

    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
