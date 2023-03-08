import { NextFunction, Request, Response } from 'express';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err) {
    res.status(400).json({
      messsage:
        'Ops an error occured. Refresh and retry.If the erro persists please contact us',
    });
  }
  next();
}
