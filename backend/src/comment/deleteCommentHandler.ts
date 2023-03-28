import { Request, Response } from 'express';
import prisma from '../prisma';

export default async function deleteComment(req: Request, res: Response) {
  const commentId = req.params.commentId;

  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
