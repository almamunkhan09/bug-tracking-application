import { Request, Response } from 'express';
import prisma from '../prisma';

interface UpdateCommentData {
  content?: string;
}

export default async function updateComment(req: Request, res: Response) {
  const commentId = req.params.commentId;
  const { content }: UpdateCommentData = req.body;

  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
      },
    });

    res.status(200).json(updatedComment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
