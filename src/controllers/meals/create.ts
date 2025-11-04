import { Request, Response, NextFunction } from 'express';

import { MealDto } from 'dto/MealDto';
import { MealService } from 'services/MealService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, mealName, photo } = req.body;
  const mealService = new MealService();

  try {
    const newMeal = await mealService.create({ name, mealName, photo });
    const mealDTO = new MealDto(newMeal);
    res.customSuccess(201, 'Meal successfully created.', mealDTO);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Meal can't be created`, null, err);
    return next(customError);
  }
};
