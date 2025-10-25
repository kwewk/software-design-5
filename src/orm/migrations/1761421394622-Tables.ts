import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1761421394622 implements MigrationInterface {
  name = 'Tables1761421394622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "Menu" (
                "ID" BIGSERIAL NOT NULL,
                "Date" date NOT NULL,
                "user_id" bigint,
                CONSTRAINT "PK_69fccdfa063aae33f301b9ddafe" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Menu_meal" (
                "Menu_id" bigint NOT NULL,
                "Meal_id" bigint NOT NULL,
                "Time" TIME NOT NULL,
                "menu_id" bigint,
                "meal_id" bigint,
                CONSTRAINT "PK_576dd658093e802e00af7ff8953" PRIMARY KEY ("Menu_id", "Meal_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Rating" (
                "ID" BIGSERIAL NOT NULL,
                "Date" date NOT NULL,
                "Rating" double precision NOT NULL,
                "Text" text,
                "meal_id" bigint,
                "user_id" bigint,
                CONSTRAINT "PK_d318ceba889e016c06c3dc50155" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."Meal_name_enum" AS ENUM('Сніданок', 'Обід', 'Перекус', 'Вечеря')
        `);
    await queryRunner.query(`
            CREATE TABLE "Meal" (
                "ID" BIGSERIAL NOT NULL,
                "Name" character varying,
                "Meal_Name" "public"."Meal_name_enum" NOT NULL,
                "photo" jsonb,
                CONSTRAINT "PK_54c7e7ead5a69ca7d95d8a91608" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Recipe_edge" (
                "ID" BIGSERIAL NOT NULL,
                "from_step_id" bigint,
                "to_step_id" bigint,
                CONSTRAINT "PK_49e0a01ceb58d7b198c7a7262f7" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Recipe_step" (
                "ID" BIGSERIAL NOT NULL,
                "Step_description" text NOT NULL,
                "recipe_id" bigint,
                CONSTRAINT "PK_e17777be7974870ee3d61449544" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Recipe" (
                "ID" BIGSERIAL NOT NULL,
                "Description" text NOT NULL,
                "CookingTime" integer NOT NULL,
                "user_id" bigint,
                "meal_id" bigint,
                CONSTRAINT "PK_0e70301c91ce811ea0d913af030" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Users_favorite_recipes" (
                "Recipe_id" bigint NOT NULL,
                "User_id" bigint NOT NULL,
                "recipe_id" bigint,
                "user_id" bigint,
                CONSTRAINT "PK_2f265cf9633a4ebfe48e96a2516" PRIMARY KEY ("Recipe_id", "User_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "User" (
                "ID" BIGSERIAL NOT NULL,
                "IsRegistered" boolean,
                "Name" character varying,
                CONSTRAINT "PK_7c38bb872c3c617c80a311b81d0" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Ingredient" (
                "ID" BIGSERIAL NOT NULL,
                "Name" character varying NOT NULL,
                "Calorie_content" integer NOT NULL,
                "Unit" character varying NOT NULL,
                "Quantity" integer NOT NULL,
                "user_id" bigint,
                CONSTRAINT "PK_c510090447477482411c08272be" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Recipe_ingredients" (
                "ID" BIGSERIAL NOT NULL,
                "Quantity" integer NOT NULL,
                "ingredient_id" bigint,
                "recipe_id" bigint,
                CONSTRAINT "PK_0633c0e077e3eb04c4603551c1b" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "Menu"
            ADD CONSTRAINT "FK_94f39ebf077514d1cb048c44edb" FOREIGN KEY ("user_id") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Menu_meal"
            ADD CONSTRAINT "FK_579fae25f72ba505ba5b57b260c" FOREIGN KEY ("menu_id") REFERENCES "Menu"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Menu_meal"
            ADD CONSTRAINT "FK_22c5e5efe0c0a967c37eb3f6402" FOREIGN KEY ("meal_id") REFERENCES "Meal"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Rating"
            ADD CONSTRAINT "FK_4fe60a91c9c8d8f10d17068aed5" FOREIGN KEY ("meal_id") REFERENCES "Meal"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Rating"
            ADD CONSTRAINT "FK_f6eedc16c37abffe0a57ce175af" FOREIGN KEY ("user_id") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe_edge"
            ADD CONSTRAINT "FK_9a4717de0caaaa35474e9d33efe" FOREIGN KEY ("from_step_id") REFERENCES "Recipe_step"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe_edge"
            ADD CONSTRAINT "FK_d393030e42cfacf1e599ba7c7ac" FOREIGN KEY ("to_step_id") REFERENCES "Recipe_step"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe_step"
            ADD CONSTRAINT "FK_11bf6a601bba147ca5bda5942c9" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe"
            ADD CONSTRAINT "FK_d8288e7cca05ed5e1c400f54a95" FOREIGN KEY ("user_id") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe"
            ADD CONSTRAINT "FK_1c2522bc9769ddd43b7de434c16" FOREIGN KEY ("meal_id") REFERENCES "Meal"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Users_favorite_recipes"
            ADD CONSTRAINT "FK_7d24b0bfc6f4b2abdb777e6870d" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Users_favorite_recipes"
            ADD CONSTRAINT "FK_62000ccc6f62b50f7976ce9fabe" FOREIGN KEY ("user_id") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Ingredient"
            ADD CONSTRAINT "FK_ab0c5a79e5169aaeb7b8f3f5d97" FOREIGN KEY ("user_id") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe_ingredients"
            ADD CONSTRAINT "FK_1ea589f36a6795bf743a5f3dfbd" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe_ingredients"
            ADD CONSTRAINT "FK_b321b033898d996e4fe632c34c6" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Recipe_ingredients" DROP CONSTRAINT "FK_b321b033898d996e4fe632c34c6"
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe_ingredients" DROP CONSTRAINT "FK_1ea589f36a6795bf743a5f3dfbd"
        `);
    await queryRunner.query(`
            ALTER TABLE "Ingredient" DROP CONSTRAINT "FK_ab0c5a79e5169aaeb7b8f3f5d97"
        `);
    await queryRunner.query(`
            ALTER TABLE "Users_favorite_recipes" DROP CONSTRAINT "FK_62000ccc6f62b50f7976ce9fabe"
        `);
    await queryRunner.query(`
            ALTER TABLE "Users_favorite_recipes" DROP CONSTRAINT "FK_7d24b0bfc6f4b2abdb777e6870d"
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe" DROP CONSTRAINT "FK_1c2522bc9769ddd43b7de434c16"
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe" DROP CONSTRAINT "FK_d8288e7cca05ed5e1c400f54a95"
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe_step" DROP CONSTRAINT "FK_11bf6a601bba147ca5bda5942c9"
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe_edge" DROP CONSTRAINT "FK_d393030e42cfacf1e599ba7c7ac"
        `);
    await queryRunner.query(`
            ALTER TABLE "Recipe_edge" DROP CONSTRAINT "FK_9a4717de0caaaa35474e9d33efe"
        `);
    await queryRunner.query(`
            ALTER TABLE "Rating" DROP CONSTRAINT "FK_f6eedc16c37abffe0a57ce175af"
        `);
    await queryRunner.query(`
            ALTER TABLE "Rating" DROP CONSTRAINT "FK_4fe60a91c9c8d8f10d17068aed5"
        `);
    await queryRunner.query(`
            ALTER TABLE "Menu_meal" DROP CONSTRAINT "FK_22c5e5efe0c0a967c37eb3f6402"
        `);
    await queryRunner.query(`
            ALTER TABLE "Menu_meal" DROP CONSTRAINT "FK_579fae25f72ba505ba5b57b260c"
        `);
    await queryRunner.query(`
            ALTER TABLE "Menu" DROP CONSTRAINT "FK_94f39ebf077514d1cb048c44edb"
        `);
    await queryRunner.query(`
            DROP TABLE "Recipe_ingredients"
        `);
    await queryRunner.query(`
            DROP TABLE "Ingredient"
        `);
    await queryRunner.query(`
            DROP TABLE "User"
        `);
    await queryRunner.query(`
            DROP TABLE "Users_favorite_recipes"
        `);
    await queryRunner.query(`
            DROP TABLE "Recipe"
        `);
    await queryRunner.query(`
            DROP TABLE "Recipe_step"
        `);
    await queryRunner.query(`
            DROP TABLE "Recipe_edge"
        `);
    await queryRunner.query(`
            DROP TABLE "Meal"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."Meal_name_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "Rating"
        `);
    await queryRunner.query(`
            DROP TABLE "Menu_meal"
        `);
    await queryRunner.query(`
            DROP TABLE "Menu"
        `);
  }
}
