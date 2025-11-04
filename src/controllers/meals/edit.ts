import { Request, Response, NextFunction } from 'express';

import { MealDto } from 'dto/MealDto';
import { MealService } from 'services/MealService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name, mealName, photo } = req.body;
  const mealService = new MealService();

  try {
    const updatedMeal = await mealService.update(id, { name, mealName, photo });
    const mealDTO = new MealDto(updatedMeal);
    res.customSuccess(200, 'Meal successfully updated.', mealDTO);
  } catch (err) {
    if (err.message.includes('not found')) {
      const customError = new CustomError(404, 'General', err.message, ['Meal not found.']);
      return next(customError);
    }
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
