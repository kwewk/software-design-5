import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Meal } from 'orm/entities/meal/Meal';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const mealRepository = getRepository(Meal);
  try {
    const meal = await mealRepository.findOne({ where: { id } });

    if (!meal) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Meal with id:${id} doesn't exist.`]);
      return next(customError);
    }

    await mealRepository.delete(id);

    res.customSuccess(200, 'Meal successfully deleted.', { id: meal.id, name: meal.name });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
