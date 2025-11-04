import { Request, Response, NextFunction } from 'express';

import { AppUserDto } from 'dto/AppUserDto';
import { AppUserService } from 'services/AppUserService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name, isRegistered } = req.body;
  const userService = new AppUserService();

  try {
    const updatedUser = await userService.update(id, { name, isRegistered });
    const userDTO = new AppUserDto(updatedUser);
    res.customSuccess(200, 'App user successfully updated.', userDTO);
  } catch (err) {
    if (err.message.includes('not found')) {
      const customError = new CustomError(404, 'General', err.message, ['User not found.']);
      return next(customError);
    }
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
