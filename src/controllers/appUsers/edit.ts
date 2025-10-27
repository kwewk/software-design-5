import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AppUser } from 'orm/entities/users/AppUser';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name, isRegistered } = req.body;

  const userRepository = getRepository(AppUser);

  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', `App user with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }

    if (name !== undefined) user.name = name;
    if (isRegistered !== undefined) user.isRegistered = isRegistered;

    try {
      await userRepository.save(user);
      res.customSuccess(200, 'App user successfully updated.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `App user can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
