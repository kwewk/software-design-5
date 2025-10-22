import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';

import { UserFavoriteRecipe } from '../favorites/UserFavoriteRecipe';
import { Ingredient } from '../ingredients/Ingredient';
import { Menu } from '../menus/Menu';
import { Rating } from '../rating/Rating';
import { Recipe } from '../recipes/Recipe';

@Entity('User')
export class AppUser {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ name: 'IsRegistered', type: 'boolean', nullable: true })
  isRegistered: boolean;

  @Column({ name: 'Name', type: 'varchar', nullable: true })
  name: string;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];

  @OneToMany(() => Menu, (menu) => menu.user)
  menu: Menu[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.user)
  ingredients: Ingredient[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => UserFavoriteRecipe, (fav) => fav.user)
  favorites: UserFavoriteRecipe[];
}
