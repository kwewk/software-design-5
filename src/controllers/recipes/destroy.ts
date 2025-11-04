import { Request, Response, NextFunction } from 'express';

import { RecipeDto } from 'dto/RecipeDto';
import { RecipeService } from 'services/RecipeService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const recipeService = new RecipeService();

  try {
    const recipe = await recipeService.delete(id);
    const recipeDTO = new RecipeDto(recipe);
    res.customSuccess(200, 'Recipe successfully deleted.', recipeDTO);
  } catch (err) {
    if (err.message.includes("doesn't exist")) {
      const customError = new CustomError(404, 'General', 'Not Found', [err.message]);
      return next(customError);
    }
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
