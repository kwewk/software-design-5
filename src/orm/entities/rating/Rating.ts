import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Recipe } from '../recipes/Recipe';
import { AppUser } from '../users/AppUser';

@Entity('Rating')
export class Rating {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @Column({ name: 'Date', type: 'date' })
  date: Date;

  @Column({ name: 'Rating', type: 'double precision' })
  rating: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.ratings, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  recipe: Recipe;

  @Column({ name: 'Text', type: 'text', nullable: true })
  text: string;

  @ManyToOne(() => AppUser, (user) => user.ratings, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: AppUser;
}
