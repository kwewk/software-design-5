import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { RecipeStep } from '../recipeSteps/RecipeStep';

@Entity('Recipe_edge')
export class RecipeEdge {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
  id: number;

  @ManyToOne(() => RecipeStep, (step) => step.fromEdges, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  fromStep: RecipeStep;

  @ManyToOne(() => RecipeStep, (step) => step.toEdges, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  toStep: RecipeStep;
}
