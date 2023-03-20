import { Request, Response } from 'express';
import log from '../utils/logger';
import { createUser, generateHash, userData } from './user-services';
import { NewUser } from './user-types';

export default async function createHandler(req: Request, res: Response) {
  try {
    const newUser: NewUser = {
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim(),
    };
    const isUserExist = Boolean(await userData(newUser.email));
    if (isUserExist) {
      return res.status(401).json({
        message: 'Email is already in use',
      });
    }
    const hashedPassword = await generateHash(newUser.password);
    newUser.password = hashedPassword;

    const result = await createUser(newUser);

    const response = {
      ...result,
      message: 'User created successfully',
    };

    return res.status(201).json(response);
  } catch (err: any) {
    log.error(err);
    return res.sendStatus(409).json(err.message);
  }
}
