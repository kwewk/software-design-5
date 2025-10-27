import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { AppUser } from 'orm/entities/users/AppUser';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const userRepository = getRepository(AppUser);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', [`App user with id:${id} doesn't exist.`]);
      return next(customError);
    }

    await userRepository.delete(id);

    res.customSuccess(200, 'App user successfully deleted.', { id: user.id, name: user.name });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
