import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { MealName } from 'orm/entities/meal/Meal';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEditMeal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, mealName } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (name !== undefined && validator.isEmpty(String(name).trim())) {
    errorsValidation.push({ name: 'Meal name cannot be empty' });
  }

  if (mealName !== undefined) {
    if (validator.isEmpty(String(mealName).trim())) {
      errorsValidation.push({ mealName: 'Meal type cannot be empty' });
    } else {
      const validMealNames = Object.values(MealName);
      if (!validMealNames.includes(mealName)) {
        errorsValidation.push({
          mealName: `Meal type must be one of: ${validMealNames.join(', ')}`,
        });
      }
    }
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Edit meal validation error', null, null, errorsValidation);
    return next(customError);
  }

  return next();
};
