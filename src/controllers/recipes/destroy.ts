import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Recipe } from 'orm/entities/recipes/Recipe';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const recipeRepository = getRepository(Recipe);
  try {
    const recipe = await recipeRepository.findOne({ where: { id } });

    if (!recipe) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Recipe with id:${id} doesn't exist.`]);
      return next(customError);
    }

    await recipeRepository.delete(id);

    res.customSuccess(200, 'Recipe successfully deleted.', { id: recipe.id, description: recipe.description });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
