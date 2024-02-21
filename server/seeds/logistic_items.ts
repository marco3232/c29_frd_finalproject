import { Knex } from "knex";

export async function seed (knex:Knex): Promise<void>{
    await knex("logistic_items").del();
        
    await knex("logistic_items").insert([
        { qty : 10}
    ])
}
