import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { UserFavoriteRecipe } from '../favorites/UserFavoriteRecipe';
import { Meal } from '../meal/Meal';
import { Rating } from '../rating/Rating';
import { RecipeIngredient } from '../recipeIngredients/RecipeIngredient';
import { RecipeStep } from '../recipeSteps/RecipeStep';
import { AppUser } from '../users/AppUser';

@Entity('Recipe')
export class Recipe {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ name: 'Description', type: 'text' })
  description: string;

  @Column({ name: 'Name', type: 'varchar' })
  name: string;

  @Column({ name: 'Photo', type: 'jsonb', nullable: true })
  photo: any;

  @Column({ name: 'Rating', type: 'double precision', nullable: true })
  rating: number;

  @Column({ name: 'CookingTime', type: 'int' })
  cookingTime: number;

  @ManyToOne(() => AppUser, (user) => user.recipes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: AppUser;

  @OneToMany(() => RecipeStep, (step) => step.recipe)
  steps: RecipeStep[];

  @OneToMany(() => RecipeIngredient, (ri) => ri.recipe)
  ingredients: RecipeIngredient[];

  @OneToMany(() => Rating, (rating) => rating.recipe)
  ratings: Rating[];

  @OneToMany(() => UserFavoriteRecipe, (fav) => fav.recipe)
  favorites: UserFavoriteRecipe[];

  @ManyToOne(() => Meal, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  meal: Meal;
}
