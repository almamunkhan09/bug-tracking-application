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
  relatedProjectId: string;
}

export default async function createIssueHandler(req: Request, res: Response) {
  console.log(req.body);
  const {
    title,
    description,
    status,
    priority,
    reporterId,
    assigneeIds,
    relatedProjectId,
  }: NewIssue = req.body;

  try {
    const result = await createIssue({
      title,
      description,
      status,
      priority,
      reporterId,
      assigneeIds,
      relatedProjectId,
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
