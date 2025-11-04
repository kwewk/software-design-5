import { Request, Response, NextFunction } from 'express';

import { AppUserDto } from 'dto/AppUserDto';
import { AppUserService } from 'services/AppUserService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const userService = new AppUserService();

  try {
    const user = await userService.findOne(id);

    if (!user) {
      const customError = new CustomError(404, 'General', `App user with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }

    const userDTO = new AppUserDto(user);
    res.customSuccess(200, 'App user found', userDTO);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
