import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

import { Meal } from '../meal/Meal';
import { Menu } from '../menus/Menu';

@Entity('Menu_meal')
export class MenuMeal {
  @PrimaryColumn({ name: 'Menu_id', type: 'bigint' })
  menuId: number;

  @PrimaryColumn({ name: 'Meal_id', type: 'bigint' })
  mealId: number;

  @Column({ name: 'Time', type: 'time without time zone' })
  time: string;

  @ManyToOne(() => Menu, (menu) => menu.menuMeals, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  menu: Menu;

  @ManyToOne(() => Meal, (meal) => meal.menuMeals, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  meal: Meal;
}
