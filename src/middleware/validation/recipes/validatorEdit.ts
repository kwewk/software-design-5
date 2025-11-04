import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEditRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { description, cookingTime, mealId } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (description !== undefined && validator.isEmpty(String(description).trim())) {
    errorsValidation.push({ description: 'Description cannot be empty' });
  }

  if (cookingTime === undefined || cookingTime === null || cookingTime === '') {
    errorsValidation.push({ cookingTime: 'Cooking time is required' });
  } else if (!validator.isInt(String(cookingTime), { min: 1 })) {
    errorsValidation.push({ cookingTime: 'Cooking time must be a positive integer' });
  }

  if (mealId !== undefined && !validator.isInt(String(mealId), { min: 1 })) {
    errorsValidation.push({ mealId: 'Meal ID must be a valid positive integer' });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Edit recipe validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }

  return next();
};
