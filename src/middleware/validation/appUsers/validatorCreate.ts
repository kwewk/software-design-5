import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateAppUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, isRegistered } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (!name || validator.isEmpty(String(name).trim())) {
    errorsValidation.push({ name: 'User name is required' });
  }

  if (isRegistered !== undefined && !validator.isBoolean(String(isRegistered))) {
    errorsValidation.push({ isRegistered: 'isRegistered must be a boolean value' });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Create app user validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }

  return next();
};
