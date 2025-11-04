import { Request, Response, NextFunction } from 'express';

import { RecipeDto } from 'dto/RecipeDto';
import { RecipeService } from 'services/RecipeService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { description, cookingTime, userId, mealId } = req.body;
  const recipeService = new RecipeService();

  try {
    const newRecipe = await recipeService.create({ description, cookingTime, userId, mealId });
    const recipeDTO = new RecipeDto(newRecipe);
    res.customSuccess(201, 'Recipe successfully created.', recipeDTO);
  } catch (err) {
    if (err.message.includes('not found')) {
      const customError = new CustomError(404, 'General', err.message, [err.message]);
      return next(customError);
    }
    const customError = new CustomError(400, 'Raw', `Recipe can't be created`, null, err);
    return next(customError);
  }
};
