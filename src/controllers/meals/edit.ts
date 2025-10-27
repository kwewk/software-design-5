import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Meal, MealName } from 'orm/entities/meal/Meal';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name, mealName, photo } = req.body;

  const mealRepository = getRepository(Meal);

  try {
    const meal = await mealRepository.findOne({ where: { id } });

    if (!meal) {
      const customError = new CustomError(404, 'General', `Meal with id:${id} not found.`, ['Meal not found.']);
      return next(customError);
    }

    if (name) meal.name = name;
    if (mealName) meal.mealName = mealName as MealName;
    if (photo !== undefined) meal.photo = photo;

    try {
      await mealRepository.save(meal);
      res.customSuccess(200, 'Meal successfully updated.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Meal can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
