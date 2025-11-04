import { getRepository, Repository } from 'typeorm';

import { AppUser } from 'orm/entities/users/AppUser';

export class AppUserService {
  private userRepository: Repository<AppUser>;

  constructor() {
    this.userRepository = getRepository(AppUser);
  }

  async findAll(): Promise<AppUser[]> {
    return await this.userRepository.find({
      relations: ['recipes', 'recipes.meal'],
    });
  }

  async findOne(id: string): Promise<AppUser | undefined> {
    return await this.userRepository.findOne(id, {
      relations: ['recipes', 'recipes.meal', 'menu', 'ratings'],
    });
  }

  async create(data: { name: string; isRegistered?: boolean }): Promise<AppUser> {
    const { name, isRegistered } = data;

    const newUser = this.userRepository.create({
      name,
      isRegistered: isRegistered || false,
    });

    return await this.userRepository.save(newUser);
  }

  async update(id: string, data: { name?: string; isRegistered?: boolean }): Promise<AppUser> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`App user with id:${id} not found`);
    }

    const { name, isRegistered } = data;

    if (name !== undefined) user.name = name;
    if (isRegistered !== undefined) user.isRegistered = isRegistered;

    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<AppUser> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`App user with id:${id} doesn't exist`);
    }

    await this.userRepository.delete(id);
    return user;
  }
}
