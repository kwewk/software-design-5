import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AppUser } from 'orm/entities/users/AppUser';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const userRepository = getRepository(AppUser);
  try {
    const user = await userRepository.findOne(id, {
      relations: ['recipes', 'recipes.meal', 'menu', 'ratings'],
    });

    if (!user) {
      const customError = new CustomError(404, 'General', `App user with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'App user found', user);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
