import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users",(table)=>{
        table.increments();
        table.string("first_name", 64)
        table.string("last_name",64)
        table.string("email").unique()
        table.bigint("phone").unique()
        table.string("password",64)
        table.string("role")
        table.timestamps(false,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users")
}

