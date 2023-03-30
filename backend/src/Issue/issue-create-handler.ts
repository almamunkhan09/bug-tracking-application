// src/routes/createIssue.ts

import { Request, Response } from 'express';
import { createIssue } from './issue-services';

interface NewIssue {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  reporterId: string;
  assigneeIds: string[];
  relatedProjectIds: string;
}

export default async function createIssueHandler(req: Request, res: Response) {
  const {
    title,
    description,
    status,
    priority,
    reporterId,
    assigneeIds,
    relatedProjectIds,
  }: NewIssue = req.body;

  try {
    const result = await createIssue({
      title,
      description,
      status,
      priority,
      reporterId,
      assigneeIds,
      relatedProjectIds,
    });

    const response = {
      ...result,
      message: 'Issue created Succefully',
    };

    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
