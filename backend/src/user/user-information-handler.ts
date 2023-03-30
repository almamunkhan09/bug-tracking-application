import { Request, Response } from 'express';
import log from '../utils/logger';
import { userDataById } from './user-services';

export default async function userInformation(req: Request, res: Response) {
  try {
    const id = req.user.id;
    const userData = await userDataById(id);
    if (!userData) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    return res.status(200).json(userData);
  } catch (err: any) {
    log.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
}
