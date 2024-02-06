import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("todo_items", (table) => {
        table.increments();
        table.string("title");
        table.string("description");
        table.boolean("status")
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("todo_items")
}

