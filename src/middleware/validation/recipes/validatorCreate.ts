import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { description, cookingTime, userId, mealId } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (!description || validator.isEmpty(String(description).trim())) {
    errorsValidation.push({ description: 'Description is required' });
  }

  if (cookingTime === undefined || cookingTime === null || cookingTime === '') {
    errorsValidation.push({ cookingTime: 'Cooking time is required' });
  } else if (!validator.isInt(String(cookingTime), { min: 1 })) {
    errorsValidation.push({ cookingTime: 'Cooking time must be a positive integer' });
  }

  if (!userId || !validator.isInt(String(userId), { min: 1 })) {
    errorsValidation.push({ userId: 'User ID must be a valid positive integer' });
  }

  if (mealId && !validator.isInt(String(mealId), { min: 1 })) {
    errorsValidation.push({ mealId: 'Meal ID must be a valid positive integer' });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Create recipe validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }

  return next();
};
