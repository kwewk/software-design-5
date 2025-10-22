import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Ingredient } from '../ingredients/Ingredient';
import { Recipe } from '../recipes/Recipe';

@Entity('Recipe_ingredients')
export class RecipeIngredient {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  ingredient: Ingredient;

  @Column({ name: 'Quantity', type: 'int' })
  quantity: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  recipe: Recipe;
}
