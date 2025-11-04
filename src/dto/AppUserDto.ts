import { AppUser } from 'orm/entities/users/AppUser';

export class AppUserDto {
  id: number;
  userName: string;
  isRegistered: boolean;
  recipes?: Array<{
    id: number;
    description: string;
    cookingTime: number;
    meal?: {
      id: number;
      name: string;
      mealType: string;
    };
  }>;

  constructor(user: AppUser) {
    this.id = user.id;
    this.userName = user.name; // Перейменовано
    this.isRegistered = user.isRegistered;

    if (user.recipes && Array.isArray(user.recipes)) {
      this.recipes = user.recipes.map((recipe) => ({
        id: recipe.id,
        description: recipe.description,
        cookingTime: recipe.cookingTime,
        meal: recipe.meal
          ? {
              id: recipe.meal.id,
              name: recipe.meal.name,
              mealType: recipe.meal.mealName,
            }
          : undefined,
      }));
    }
  }
}
