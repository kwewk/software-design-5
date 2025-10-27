import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Meal } from 'orm/entities/meal/Meal';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const mealRepository = getRepository(Meal);
  try {
    const meal = await mealRepository.findOne(id, {
      relations: ['recipe', 'recipe.user'],
    });

    if (!meal) {
      const customError = new CustomError(404, 'General', `Meal with id:${id} not found.`, ['Meal not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Meal found', meal);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
