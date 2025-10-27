import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Meal } from 'orm/entities/meal/Meal';
import { Recipe } from 'orm/entities/recipes/Recipe';
import { AppUser } from 'orm/entities/users/AppUser';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { description, cookingTime, userId, mealId } = req.body;

  const recipeRepository = getRepository(Recipe);
  const userRepository = getRepository(AppUser);
  const mealRepository = getRepository(Meal);

  try {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      const customError = new CustomError(404, 'General', 'User not found', [`User with id:${userId} not found`]);
      return next(customError);
    }

    let meal = null;
    if (mealId) {
      meal = await mealRepository.findOne({ where: { id: mealId } });
      if (!meal) {
        const customError = new CustomError(404, 'General', 'Meal not found', [`Meal with id:${mealId} not found`]);
        return next(customError);
      }
    }

    const newRecipe = new Recipe();
    newRecipe.description = description;
    newRecipe.cookingTime = cookingTime;
    newRecipe.user = user;
    if (meal) {
      newRecipe.meal = meal;
    }

    await recipeRepository.save(newRecipe);

    res.customSuccess(201, 'Recipe successfully created.', newRecipe);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Recipe can't be created`, null, err);
    return next(customError);
  }
};
