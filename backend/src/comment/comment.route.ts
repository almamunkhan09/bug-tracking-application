import { Router } from 'express';
import createComment from './createCommentHandler';
import deleteComment from './deleteCommentHandler';
import updateComment from './updateCommentHandler';

export const comments = Router();

comments.post('/', createComment);
// comments.get('/);
comments.put('/:commentId', updateComment);
comments.delete('/:commentId', deleteComment);
