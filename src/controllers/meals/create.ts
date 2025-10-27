import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Meal, MealName } from 'orm/entities/meal/Meal';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, mealName, photo } = req.body;

  const mealRepository = getRepository(Meal);

  try {
    const newMeal = new Meal();
    newMeal.name = name;
    newMeal.mealName = mealName as MealName;
    if (photo) {
      newMeal.photo = photo;
    }

    await mealRepository.save(newMeal);

    res.customSuccess(201, 'Meal successfully created.', newMeal);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Meal can't be created`, null, err);
    return next(customError);
  }
};
