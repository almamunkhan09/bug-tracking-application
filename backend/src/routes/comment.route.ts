import { Router } from 'express';
import createComment from '../controller/createCommentHandler';
import deleteComment from '../controller/deleteCommentHandler';

export const comments = Router();

comments.post('/', createComment);
// comments.get('/);
// comments.put('/:issueId', updateIssue);
comments.delete('/:commentId', deleteComment);
