import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("logistics", (table) => {
        table.increments("id").primary();
        table.string("uuid").notNullable();
        table.enum("purpose", ["donation", "deliver", "return"]).notNullable();
        table.integer("checkin_id").unsigned().references("id").inTable("checkins");
        table.integer("checkout_id").unsigned().references("id").inTable("checkouts");
        table.string("room");
        table.string("building");
        table.string("street");
        table.integer("district_id");
        table.integer("contact_number");
        table.string("contact_name");
        table.date("favoured_date_1");
        table.date("favoured_date_2");
        table.date("favoured_date_3");
        table.date("confirmed_date");
        table.string("confirmed_session");
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