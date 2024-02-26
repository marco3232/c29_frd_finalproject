import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("logistics", (table) => {
    table.increments("id").primary();
    table.uuid("uuid").defaultTo(knex.fn.uuid());
    table
      .enum("purpose", ["捐贈", "租借", "回收"])
      .defaultTo("捐贈");
    table.string("room");
    table.string("building");
    table.string("street");
    table.string("district");
    table.integer("contact_number");
    table.string("contact_name");
    table.string("confirmed_date");
    table.string("confirmed_session");
    table.boolean("tried");
    table.boolean("rescheduled");
    table.integer("user_id");
    table
      .enum("status", ["in-storage", "in-transit", "delivered", "cancelled"])
      .defaultTo("in-storage");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("logistics");
}
