import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Recipe } from 'orm/entities/recipes/Recipe';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const recipeRepository = getRepository(Recipe);
  try {
    const recipe = await recipeRepository.findOne(id, {
      relations: ['user', 'meal'],
    });

    if (!recipe) {
      const customError = new CustomError(404, 'General', `Recipe with id:${id} not found.`, ['Recipe not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Recipe found', recipe);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
