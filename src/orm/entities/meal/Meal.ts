import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { MenuMeal } from '../menuMeal/MenuMeal';
import { Rating } from '../rating/Rating';
import { Recipe } from '../recipes/Recipe';

export enum MealName {
  SNIDANOK = 'Сніданок',
  OBID = 'Обід',
  PEREKUS = 'Перекус',
  VECHERYA = 'Вечеря',
}

@Entity('Meal')
export class Meal {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @OneToMany(() => Recipe, (recipe) => recipe.meal, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  recipe: Recipe;

  @OneToMany(() => MenuMeal, (mm) => mm.meal)
  menuMeals: MenuMeal[];

  @OneToMany(() => Rating, (rating) => rating.meal, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  ratings: Rating[];

  @Column({ name: 'Name', type: 'varchar', nullable: true })
  name: string;

  @Column({ name: 'Meal_Name', type: 'enum', enum: MealName })
  mealName: MealName;
}
