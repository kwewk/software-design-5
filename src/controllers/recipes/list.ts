import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Recipe } from 'orm/entities/recipes/Recipe';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const recipeRepository = getRepository(Recipe);
  try {
    const recipes = await recipeRepository.find({
      relations: ['user', 'meal'],
    });
    res.customSuccess(200, 'List of recipes.', recipes);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of recipes.`, null, err);
    return next(customError);
  }
};
