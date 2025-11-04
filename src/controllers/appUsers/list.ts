import { Request, Response, NextFunction } from 'express';

import { AppUserDto } from 'dto/AppUserDto';
import { AppUserService } from 'services/AppUserService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const userService = new AppUserService();

  try {
    const users = await userService.findAll();
    const usersDTO = users.map((user) => new AppUserDto(user));
    res.customSuccess(200, 'List of app users.', usersDTO);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of app users.`, null, err);
    return next(customError);
  }
};
