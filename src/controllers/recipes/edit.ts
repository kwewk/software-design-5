import { Request, Response, NextFunction } from 'express';

import { RecipeDto } from 'dto/RecipeDto';
import { RecipeService } from 'services/RecipeService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { description, cookingTime, mealId } = req.body;
  const recipeService = new RecipeService();

  try {
    const updatedRecipe = await recipeService.update(id, { description, cookingTime, mealId });
    const recipeDTO = new RecipeDto(updatedRecipe);
    res.customSuccess(200, 'Recipe successfully updated.', recipeDTO);
  } catch (err) {
    if (err.message.includes('not found')) {
      const customError = new CustomError(404, 'General', err.message, [err.message]);
      return next(customError);
    }
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
