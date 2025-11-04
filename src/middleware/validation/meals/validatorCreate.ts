import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { MealName } from 'orm/entities/meal/Meal';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateMeal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, mealName } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (!name || validator.isEmpty(String(name).trim())) {
    errorsValidation.push({ name: 'Meal name is required' });
  }

  if (!mealName || validator.isEmpty(String(mealName).trim())) {
    errorsValidation.push({ mealName: 'Meal type is required' });
  } else {
    const validMealNames = Object.values(MealName);
    if (!validMealNames.includes(mealName)) {
      errorsValidation.push({
        mealName: `Meal type must be one of: ${validMealNames.join(', ')}`,
      });
    }
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Create meal validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }

  return next();
};
