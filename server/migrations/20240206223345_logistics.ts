import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("logistics", (table) => {
        table.increments("id").primary();
        table.string("uuid").notNullable();
        table.enum("purpose", ["donation", "deliver", "return"]).notNullable();
        table.string("room");
        table.string("building");
        table.string("street");
        table.integer("district");
        table.integer("contact_number");
        table.string("contact_name");
        table.date("confirmed_date");
        table.string("confirmed_session");
        table.integer("donate_items_id")
        table.boolean("tried");
        table.boolean("rescheduled");
        table.enum("status", ["in-storage", "in-transit", "delivered", "cancelled"]).defaultTo("in-storage");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("logistics");
}