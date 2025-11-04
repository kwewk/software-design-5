import { Request, Response, NextFunction } from 'express';

import { RecipeDto } from 'dto/RecipeDto';
import { RecipeService } from 'services/RecipeService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const recipeService = new RecipeService();

  try {
    const recipe = await recipeService.findOne(id);

    if (!recipe) {
      const customError = new CustomError(404, 'General', `Recipe with id:${id} not found.`, ['Recipe not found.']);
      return next(customError);
    }

    const recipeDTO = new RecipeDto(recipe);
    res.customSuccess(200, 'Recipe found', recipeDTO);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
