import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Meal } from '../meal/Meal';
import { AppUser } from '../users/AppUser';

@Entity('Rating')
export class Rating {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ name: 'Date', type: 'date' })
  date: Date;

  @Column({ name: 'Rating', type: 'double precision' })
  rating: number;

  @ManyToOne(() => Meal, (meal) => meal.ratings, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  meal: Meal;

  @Column({ name: 'Text', type: 'text', nullable: true })
  text: string;

  @ManyToOne(() => AppUser, (user) => user.ratings, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: AppUser;
}
