import { Request, Response, NextFunction } from 'express';

import { AppUserDto } from 'dto/AppUserDto';
import { AppUserService } from 'services/AppUserService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, isRegistered } = req.body;
  const userService = new AppUserService();

  try {
    const newUser = await userService.create({ name, isRegistered });
    const userDTO = new AppUserDto(newUser);
    res.customSuccess(201, 'App user successfully created.', userDTO);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `App user can't be created`, null, err);
    return next(customError);
  }
};
