import { Request, Response, NextFunction } from 'express';

import { MealDto } from 'dto/MealDto';
import { MealService } from 'services/MealService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const mealService = new MealService();

  try {
    const meal = await mealService.delete(id);
    const mealDTO = new MealDto(meal);
    res.customSuccess(200, 'Meal successfully deleted.', mealDTO);
  } catch (err) {
    if (err.message.includes("doesn't exist")) {
      const customError = new CustomError(404, 'General', 'Not Found', [err.message]);
      return next(customError);
    }
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
