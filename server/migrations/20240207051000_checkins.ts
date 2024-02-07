
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("checkins", (table) => {
        table.increments("id").primary();
        table.string("uuid").notNullable();
        table.string("item_image_path");
        table.integer("user_id").unsigned().references("id").inTable("users");;
        table.integer("logistic_id").unsigned().references("id").inTable("logistics")
        table.integer("donate_item_id").unsigned().references("id").inTable("donate_items");
        table.enum("goods_status", ["normal", "repairing", "rented", "disposed", "lost"]).defaultTo("normal")
        table.enum("order_status", ["rejected", "accepted", "received", "processed", "discharged", "checkout"]).defaultTo("received");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("checkins");
}