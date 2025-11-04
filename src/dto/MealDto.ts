import { Meal } from 'orm/entities/meal/Meal';

export class MealDto {
  id: number;
  name: string;
  mealType: string;
  photo?: any;
  recipes?: Array<{
    id: number;
    description: string;
    cookingTime: number;
    user?: {
      id: number;
      name: string;
    };
  }>;

  constructor(meal: Meal) {
    this.id = meal.id;
    this.name = meal.name;
    this.mealType = meal.mealName;
    this.photo = meal.photo;

    if (meal.recipe && Array.isArray(meal.recipe)) {
      this.recipes = meal.recipe.map((recipe) => ({
        id: recipe.id,
        description: recipe.description,
        cookingTime: recipe.cookingTime,
        user: recipe.user
          ? {
              id: recipe.user.id,
              name: recipe.user.name,
            }
          : undefined,
      }));
    }
  }
}
