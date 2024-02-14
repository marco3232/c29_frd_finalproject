import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("logistics", (table) => {
        table.increments("id").primary();
        table.string("uuid");
        table.enum("purpose", ["donation", "deliver", "return"]).defaultTo("donation");
        table.string("room");
        table.string("building");
        table.string("street");
        table.string("district");
        table.integer("contact_number");
        table.string("contact_name");
        table.date("confirmed_date");
        table.string("confirmed_session");
        table.boolean("tried");
        table.boolean("rescheduled");
        table.integer("user_id")
        table.enum("status", ["in-storage", "in-transit", "delivered", "cancelled"]).defaultTo("in-storage");
        table.timestamps(false,true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("logistics");
}