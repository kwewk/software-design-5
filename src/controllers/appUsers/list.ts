import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AppUser } from 'orm/entities/users/AppUser';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(AppUser);
  try {
    const users = await userRepository.find({
      relations: ['recipes', 'recipes.meal'],
    });
    res.customSuccess(200, 'List of app users.', users);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of app users.`, null, err);
    return next(customError);
  }
};
