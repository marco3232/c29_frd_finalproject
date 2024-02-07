import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("todo_items").del();

  // Inserts seed entries
  for (let i = 0; i < 10; i++) {
    await knex("todo_items").insert({
      title: faker.git.commitMessage(),
      description: faker.commerce.productDescription(),
      status: false,
    });
  }
}
