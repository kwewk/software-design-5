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
