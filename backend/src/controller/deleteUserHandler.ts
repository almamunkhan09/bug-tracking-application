import { NextFunction, Request, Response } from 'express';
// import { omit } from 'lodash';
import prisma from '../../prisma';
import log from '../utils/logger';

export default async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const existedData = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!existedData) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const result = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json(result);
    next();
  } catch (err) {
    log.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
}
