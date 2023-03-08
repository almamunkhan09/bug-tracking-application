import { Request, Response, Router } from 'express';

export const apiHealthCheck = Router();

apiHealthCheck.get('/', (req: Request, res: Response) => {
  return res.sendStatus(200);
});
