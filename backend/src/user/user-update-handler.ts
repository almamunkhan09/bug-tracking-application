import { Request, Response } from 'express';
import log from '../utils/logger';
import { updateUserData, userDataById } from './user-services';
import { UpdateData } from './user-types';

export default async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (id !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ err: 'Not allowed to do this action' });
    }

    const existedData = await userDataById(id);
    if (!existedData) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const updateData: UpdateData = {
      name: req.body.name ? req.body.name.trim() : existedData.name,
      profilePicture: req.body.profilePicture
        ? req.body.profilePicture.trim()
        : existedData.profilePicture,
    };

    const result = await updateUserData(id, updateData);

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
