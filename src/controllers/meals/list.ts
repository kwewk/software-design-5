import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Meal } from 'orm/entities/meal/Meal';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const mealRepository = getRepository(Meal);
  try {
    const meals = await mealRepository.find({
      relations: ['recipe'],
    });
    res.customSuccess(200, 'List of meals.', meals);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of meals.`, null, err);
    return next(customError);
  }
};
