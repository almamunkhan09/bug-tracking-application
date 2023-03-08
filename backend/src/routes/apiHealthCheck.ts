import { Request, Response, Router } from 'express';

export const apiHealthCheck = Router();

apiHealthCheck.get('/', async (req: Request, res: Response) => {
  res.sendStatus(200);
});
