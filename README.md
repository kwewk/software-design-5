# Лабораторно-практична робота №5

### «Розширення бекенд-додатку власними сутностями та реалізація REST API»

---

## Реалізовані сутності та їх зв’язки

### Діаграма інформаційної системи

![Домашній повар](images/Home_Cook_Remastered.jpg)

### Опис

- **Meal** — містить інформацію про страви
- **AppUser** — містить інформацію про користувачів
- **Recipe** — містить інформацію про рецепти
- Також реалізовано усі інші сутності з діаграми

## Реалізовані API ендпоінти

### Meal

- `POST /v1/meals` — створення запису
- `GET /v1/meals` — отримання всіх записів
- `GET /v1/meals/:id` — отримання запису за ID
- `PATCH /v1/meals/:id` — оновлення запису
- `DELETE /v1/meals/:id` — видалення запису

### Recipe

- `POST /v1/recipes` — створення запису
- `GET /v1/recipes` — отримання всіх записів
- `GET /v1/recipes/:id` — отримання запису за ID
- `PATCH /v1/recipes/:id` — оновлення запису
- `DELETE /v1/recipes/:id` — видалення запису

### AppUser

- `POST /v1/app-users` — створення запису
- `GET /v1/app-users` — отримання всіх записів
- `GET /v1/app-users/:id` — отримання запису за ID
- `PATCH /v1/app-users/:id` — оновлення запису
- `DELETE /v1/app-users/:id` — видалення запису

---

## Скріншоти з Postman:

Meals

POST /v1/meals
![POST](images/meals_create.png)

GET /v1/meals
![GET_LIST](images/meals_list.png)

GET /v1/meals/:id
![GET](images/meals_show.png)

PATCH /v1/meals/:id
![UPDATE](images/meals_update.png)

DELETE /v1/meals/:id
![DELETE](images/meals_delete.png)

Recipes

POST /v1/recipes
![POST](images/recipes_create.png)

GET /v1/recipes
![GET_LIST](images/recipes_list.png)

GET /v1/recipes/:id
![GET](images/recipes_show.png)

PATCH /v1/recipes/:id
![UPDATE](images/recipes_update.png)

DELETE /v1/recipes/:id
![DELETE](images/recipes_delete.png)

AppUser
POST /v1/app-users/:id
![POST](images/appUser_create.png)

GET /v1/app-users/:id
![GET_LIST](images/appUser_list.png)

GET /v1/app-users/:id
![GET](images/appUser_show.png)

PATCH /v1/app-users/:id
![UPDATE](images/appUser_update.png)

DELETE /v1/app-users/:id
![DELETE](images/appUser_delete.png)


# Лабораторно-практична робота №6

## «Реалізація сервісного шару, DTO та валідації даних»

## Структура застосунку та принципи роботи шарів

### Middleware — перевірка вхідних даних

- Аналізує запити перед передачею далі по ланцюгу.
- Виявляє помилки у форматі чи структурі даних.
- Повертає код 400, якщо дані не проходять перевірку.

**Призначення:** забезпечує, щоб у контролер потрапляли лише валідні запити.

### Controller — взаємодія між клієнтом і системою

- Приймає перевірені дані.
- Викликає відповідні методи сервісного шару.
- Формує вихідні DTO для відповіді клієнту.

**Призначення:** організовує обмін між HTTP-запитами та бізнес-логікою.

- Service — основна логіка застосунку
- Виконує операції, що стосуються правил домену.
- Працює із репозиторієм, не залежачи від контролера.
- Реалізує CRUD-операції та бізнес-процеси.

**Призначення:** містить усю логіку, яка визначає поведінку системи.

### Repository — робота з базою даних

- Забезпечує взаємодію з ORM та таблицями БД.
- Не містить бізнес-логіки чи HTTP-залежностей.
- Використовується сервісом як джерело даних.

**Призначення:** централізований шар для операцій з базою даних.

## Приклади коду
### Middleware
```typescript
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { MealName } from 'orm/entities/meal/Meal';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateMeal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, mealName } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (!name || validator.isEmpty(String(name).trim())) {
    errorsValidation.push({ name: 'Meal name is required' });
  }

  if (!mealName || validator.isEmpty(String(mealName).trim())) {
    errorsValidation.push({ mealName: 'Meal type is required' });
  } else {
    const validMealNames = Object.values(MealName);
    if (!validMealNames.includes(mealName)) {
      errorsValidation.push({
        mealName: `Meal type must be one of: ${validMealNames.join(', ')}`,
      });
    }
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Create meal validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }

  return next();
};
```

### DTO
```typescript
import { AppUser } from 'orm/entities/users/AppUser';

export class AppUserDto {
  id: number;
  userName: string;
  isRegistered: boolean;
  recipes?: Array<{
    id: number;
    description: string;
    cookingTime: number;
    meal?: {
      id: number;
      name: string;
      mealType: string;
    };
  }>;

  constructor(user: AppUser) {
    this.id = user.id;
    this.userName = user.name; // Перейменовано
    this.isRegistered = user.isRegistered;

    if (user.recipes && Array.isArray(user.recipes)) {
      this.recipes = user.recipes.map((recipe) => ({
        id: recipe.id,
        description: recipe.description,
        cookingTime: recipe.cookingTime,
        meal: recipe.meal
          ? {
              id: recipe.meal.id,
              name: recipe.meal.name,
              mealType: recipe.meal.mealName,
            }
          : undefined,
      }));
    }
  }
}
```

### Service 
```typescript
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
```

Скріншоти з Postman
