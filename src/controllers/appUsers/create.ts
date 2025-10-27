import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AppUser } from 'orm/entities/users/AppUser';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, isRegistered } = req.body;

  const userRepository = getRepository(AppUser);

  try {
    const newUser = new AppUser();
    newUser.name = name;
    newUser.isRegistered = isRegistered || false;

    await userRepository.save(newUser);

    res.customSuccess(201, 'App user successfully created.', newUser);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `App user can't be created`, null, err);
    return next(customError);
  }
};
