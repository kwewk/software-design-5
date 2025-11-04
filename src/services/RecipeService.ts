import { getRepository, Repository } from 'typeorm';

import { Meal } from 'orm/entities/meal/Meal';
import { Recipe } from 'orm/entities/recipes/Recipe';
import { AppUser } from 'orm/entities/users/AppUser';

export class RecipeService {
  private recipeRepository: Repository<Recipe>;
  private userRepository: Repository<AppUser>;
  private mealRepository: Repository<Meal>;

  constructor() {
    this.recipeRepository = getRepository(Recipe);
    this.userRepository = getRepository(AppUser);
    this.mealRepository = getRepository(Meal);
  }

  async findAll(): Promise<Recipe[]> {
    return await this.recipeRepository.find({
      relations: ['user', 'meal'],
    });
  }

  async findOne(id: string): Promise<Recipe | undefined> {
    return await this.recipeRepository.findOne(id, {
      relations: ['user', 'meal'],
    });
  }

  async create(data: { description: string; cookingTime: number; userId: number; mealId?: number }): Promise<Recipe> {
    const { description, cookingTime, userId, mealId } = data;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with id:${userId} not found`);
    }

    let meal = null;
    if (mealId) {
      meal = await this.mealRepository.findOne({ where: { id: mealId } });
      if (!meal) {
        throw new Error(`Meal with id:${mealId} not found`);
      }
    }

    const newRecipe = this.recipeRepository.create({
      description,
      cookingTime,
      user,
      meal,
    });

    return await this.recipeRepository.save(newRecipe);
  }

  async update(id: string, data: { description?: string; cookingTime?: number; mealId?: number }): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new Error(`Recipe with id:${id} not found`);
    }

    const { description, cookingTime, mealId } = data;

    if (description) recipe.description = description;
    if (cookingTime) recipe.cookingTime = cookingTime;

    if (mealId) {
      const meal = await this.mealRepository.findOne({ where: { id: mealId } });
      if (!meal) {
        throw new Error(`Meal with id:${mealId} not found`);
      }
      recipe.meal = meal;
    }

    return await this.recipeRepository.save(recipe);
  }

  async delete(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new Error(`Recipe with id:${id} doesn't exist`);
    }

    await this.recipeRepository.delete(id);
    return recipe;
  }
}
