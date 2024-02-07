import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("checkins", (table) => {
        table.increments("id").primary();
        table.string("uuid").notNullable();
        table.string("item_image_path");
        table.integer("category_id");
        table.integer("donater_id").unsigned().references("id").inTable("users");
        table.enum("status", ["rejected", "accepted", "received", "processed", "discharged"]).defaultTo("received");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("checkins");
}