import { Request, Response } from 'express';
import prisma from '../prisma';

interface NewComment {
  content: string;
  issueId: string;
  commentedById: string;
}

export default async function createComment(req: Request, res: Response) {
  const { content, issueId, commentedById }: NewComment = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        issue: {
          connect: {
            id: issueId,
          },
        },
        commentedBy: {
          connect: {
            id: commentedById,
          },
        },
      },
      include: {
        issue: true,
        commentedBy: true,
      },
    });

    res.status(201).json(newComment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
