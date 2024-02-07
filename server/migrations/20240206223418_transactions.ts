import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("transactions", (table) => {
        table.increments("id").primary();
        table.integer("checkout_id").unsigned().references("id").inTable("checkouts");
        table.integer("user_id").unsigned().references("id").inTable("users");
        table.enum("purpose", ["deposit", "rent_charge"]).notNullable();
        table.decimal("total_amount");
        table.string("stripe_id");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("transactions");
}

