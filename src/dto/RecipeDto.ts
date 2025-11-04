import { Recipe } from 'orm/entities/recipes/Recipe';

export class RecipeDto {
  id: number;
  description: string;
  cookingTime: number;
  user?: {
    id: number;
    name: string;
    isRegistered: boolean;
  };
  meal?: {
    id: number;
    name: string;
    mealName: string;
  };

  constructor(recipe: Recipe) {
    this.id = recipe.id;
    this.description = recipe.description;
    this.cookingTime = recipe.cookingTime;

    if (recipe.user) {
      this.user = {
        id: recipe.user.id,
        name: recipe.user.name,
        isRegistered: recipe.user.isRegistered,
      };
    }

    if (recipe.meal) {
      this.meal = {
        id: recipe.meal.id,
        name: recipe.meal.name,
        mealName: recipe.meal.mealName,
      };
    }
  }
}
