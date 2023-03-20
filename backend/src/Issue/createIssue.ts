// src/routes/createIssue.ts

import { Request, Response } from 'express';
import prisma from '../../prisma';

interface NewIssue {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  reporterId: string;
  assigneeIds: string[];
  relatedProjectIds: string;
}

export default async function createIssue(req: Request, res: Response) {
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
    const newIssue = await prisma.issue.create({
      data: {
        title,
        description,
        status: status || 'open',
        priority: priority || 'low',
        reporter: { connect: { id: reporterId } },
        assignees: { connect: assigneeIds.map((id) => ({ id })) },
        relatedProject: { connect: { id: relatedProjectIds } },
      },
      include: {
        reporter: true,
        assignees: {
          select: {
            name: true,
          },
        },
        relatedProject: true,
      },
    });

    res.status(201).json(newIssue);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
