import { getRepository, Repository } from 'typeorm';

import { Meal, MealName } from 'orm/entities/meal/Meal';

export class MealService {
  private mealRepository: Repository<Meal>;

  constructor() {
    this.mealRepository = getRepository(Meal);
  }

  async findAll(): Promise<Meal[]> {
    return await this.mealRepository.find({
      relations: ['recipe'],
    });
  }

  async findOne(id: string): Promise<Meal | undefined> {
    return await this.mealRepository.findOne(id, {
      relations: ['recipe', 'recipe.user'],
    });
  }

  async create(data: { name: string; mealName: MealName; photo?: any }): Promise<Meal> {
    const { name, mealName, photo } = data;

    const newMeal = this.mealRepository.create({
      name,
      mealName,
      photo,
    });

    return await this.mealRepository.save(newMeal);
  }

  async update(id: string, data: { name?: string; mealName?: MealName; photo?: any }): Promise<Meal> {
    const meal = await this.mealRepository.findOne({ where: { id } });
    if (!meal) {
      throw new Error(`Meal with id:${id} not found`);
    }

    const { name, mealName, photo } = data;

    if (name) meal.name = name;
    if (mealName) meal.mealName = mealName;
    if (photo !== undefined) meal.photo = photo;

    return await this.mealRepository.save(meal);
  }

  async delete(id: string): Promise<Meal> {
    const meal = await this.mealRepository.findOne({ where: { id } });
    if (!meal) {
      throw new Error(`Meal with id:${id} doesn't exist`);
    }

    await this.mealRepository.delete(id);
    return meal;
  }
}
