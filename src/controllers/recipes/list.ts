import { Request, Response, NextFunction } from 'express';

import { RecipeDto } from 'dto/RecipeDto';
import { RecipeService } from 'services/RecipeService';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const recipeService = new RecipeService();

  try {
    const recipes = await recipeService.findAll();
    const recipesDTO = recipes.map((recipe) => new RecipeDto(recipe));
    res.customSuccess(200, 'List of recipes.', recipesDTO);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of recipes.`, null, err);
    return next(customError);
  }
};
