import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.text("address")
        table.string("chi_surname");
        table.string("chi_given_name");
        table.string("eng_surname");
        table.string("eng_given_name");
        table.integer("mobile_phone").notNullable().unique();
        table.string("address_proof_image_path");
        table.enum("status", ["not verified", "processing", "verified"]).defaultTo("not verified");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}