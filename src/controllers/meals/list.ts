import { Request, Response, NextFunction } from 'express';

import { MealDto } from 'dto/MealDto';
import { MealService } from 'services/MealService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const mealService = new MealService();

  try {
    const meals = await mealService.findAll();
    const mealsDTO = meals.map((meal) => new MealDto(meal));
    res.customSuccess(200, 'List of meals.', mealsDTO);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of meals.`, null, err);
    return next(customError);
  }
};
