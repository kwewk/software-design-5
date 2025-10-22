import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { RecipeIngredient } from '../recipeIngredients/RecipeIngredient';
import { AppUser } from '../users/AppUser';

@Entity('Ingredient')
export class Ingredient {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ name: 'Name', type: 'varchar' })
  name: string;

  @Column({ name: 'Calorie_content', type: 'int' })
  calorieContent: number;

  @Column({ name: 'Unit', type: 'varchar' })
  unit: string;

  @Column({ name: 'Quantity', type: 'int' })
  quantity: number;

  @ManyToOne(() => AppUser, (user) => user.ingredients, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: AppUser;

  @OneToMany(() => RecipeIngredient, (ri) => ri.ingredient)
  recipeIngredients: RecipeIngredient[];
}
