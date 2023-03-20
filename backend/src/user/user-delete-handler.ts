import { Request, Response } from 'express';
import log from '../utils/logger';
import { deleteUserById, userDataById } from './user-services';

export default async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ err: 'Not allowed to do this action' });
    }
    const existedData = await userDataById(id);
    if (!existedData) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const result = await deleteUserById(id);

    const response = {
      ...result,
      message: 'User Updated Successfully',
    };

    return res.status(200).json(response);
  } catch (err: any) {
    log.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
}
