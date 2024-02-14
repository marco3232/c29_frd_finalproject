import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("donate_items", (table) => {
    table.increments("id").primary();
    table.uuid('uuid').defaultTo(knex.fn.uuid())
    table.string("item_name");
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("donate_items");
}
