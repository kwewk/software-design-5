import { Request, Response, NextFunction } from 'express';

import { MealDto } from 'dto/MealDto';
import { MealService } from 'services/MealService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const mealService = new MealService();

  try {
    const meal = await mealService.findOne(id);

    if (!meal) {
      const customError = new CustomError(404, 'General', `Meal with id:${id} not found.`, ['Meal not found.']);
      return next(customError);
    }

    const mealDTO = new MealDto(meal);
    res.customSuccess(200, 'Meal found', mealDTO);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
