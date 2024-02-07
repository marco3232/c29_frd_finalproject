import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("checkouts", (table) => {
        table.increments("id").primary();
        table.string("uuid").notNullable();
        table.integer("checkin_id").unsigned().references("id").inTable("checkins")
        table.integer("user_id").unsigned().references("id").inTable("users");
        table.enum("type", ["rent", "giveaway"]).notNullable();
        table.decimal("deposit_charge");
        table.decimal("rent_charge");
        table.enum("status", ["to-be-confirmed", "in-use", "returned", "lost", "damaged", "cancelled"]).defaultTo("to-be-confirmed");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("checkouts");
}