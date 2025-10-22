import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { RecipeEdge } from '../edges/RecipeEdge';
import { Recipe } from '../recipes/Recipe';

@Entity('Recipe_step')
export class RecipeStep {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  recipe: Recipe;

  @Column({ name: 'Step_description', type: 'text' })
  stepDescription: string;

  @OneToMany(() => RecipeEdge, (edge) => edge.fromStep)
  fromEdges: RecipeEdge[];

  @OneToMany(() => RecipeEdge, (edge) => edge.toStep)
  toEdges: RecipeEdge[];
}
