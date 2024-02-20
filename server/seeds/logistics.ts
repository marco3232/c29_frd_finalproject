import { Knex } from "knex";

export async function seed (knex: Knex): Promise<void>{
    await knex ("logistics").del();

    await knex("logistics").insert([
        { }
    ])
}