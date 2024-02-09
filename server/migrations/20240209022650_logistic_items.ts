import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable("logistic_items",(table)=>{
        table.increments("id").primary();
        table.integer("logistic_id").references("id").inTable("logistics");
        table.integer("donate_item_id").references("id").inTable("donate_items");
        table.integer("qty");
        table.timestamps(false,true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("logistic_items")
}

