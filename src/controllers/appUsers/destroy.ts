import { Request, Response, NextFunction } from 'express';

import { AppUserDto } from 'dto/AppUserDto';
import { AppUserService } from 'services/AppUserService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const userService = new AppUserService();

  try {
    const user = await userService.delete(id);
    const userDTO = new AppUserDto(user);
    res.customSuccess(200, 'App user successfully deleted.', userDTO);
  } catch (err) {
    if (err.message.includes("doesn't exist")) {
      const customError = new CustomError(404, 'General', 'Not Found', [err.message]);
      return next(customError);
    }
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
