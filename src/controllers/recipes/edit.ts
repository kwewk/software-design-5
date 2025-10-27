import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Meal } from 'orm/entities/meal/Meal';
import { Recipe } from 'orm/entities/recipes/Recipe';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { description, cookingTime, mealId } = req.body;

  const recipeRepository = getRepository(Recipe);
  const mealRepository = getRepository(Meal);

  try {
    const recipe = await recipeRepository.findOne({ where: { id } });

    if (!recipe) {
      const customError = new CustomError(404, 'General', `Recipe with id:${id} not found.`, ['Recipe not found.']);
      return next(customError);
    }

    if (description) recipe.description = description;
    if (cookingTime) recipe.cookingTime = cookingTime;

    if (mealId) {
      const meal = await mealRepository.findOne({ where: { id: mealId } });
      if (!meal) {
        const customError = new CustomError(404, 'General', 'Meal not found', [`Meal with id:${mealId} not found`]);
        return next(customError);
      }
      recipe.meal = meal;
    }

    await recipeRepository.save(recipe);
    res.customSuccess(200, 'Recipe successfully updated.');
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
