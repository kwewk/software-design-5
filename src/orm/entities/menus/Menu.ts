import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { MenuMeal } from '../menuMeal/MenuMeal';
import { AppUser } from '../users/AppUser';

@Entity('Menu')
export class Menu {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ name: 'Date', type: 'date' })
  date: Date;

  @ManyToOne(() => AppUser, (user) => user.menu, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: AppUser;

  @OneToMany(() => MenuMeal, (mm) => mm.meal)
  menuMeals: MenuMeal[];
}
