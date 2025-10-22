import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Recipe } from '../recipes/Recipe';
import { AppUser } from '../users/AppUser';

@Entity('Users_favorite_recipes')
export class UserFavoriteRecipe {
  @PrimaryColumn({ name: 'Recipe_id', type: 'bigint' })
  recipeId: number;

  @PrimaryColumn({ name: 'User_id', type: 'bigint' })
  userId: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.favorites, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  recipe: Recipe;

  @ManyToOne(() => AppUser, (user) => user.favorites, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: AppUser;
}
