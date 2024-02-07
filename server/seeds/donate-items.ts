import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("donate_items").del();

    // Inserts seed entries
    await knex("donate_items").insert([
        { item_name: "wheelchair" },
        { item_name: "electric_wheelchair" },
        { item_name: "crutch"},
        { item_name: "walker_frame" },
        { item_name: "bath_chair" },
        { item_name: "walker_frame" },
        { item_name: "nutritional_supplement"},
        { item_name: "adult_diapers" },
        { item_name: "wipes"},
        { item_name: "sphygmomanometer" },
        { item_name: "paramount_bed" },
        { item_name: "lotion" },
        { item_name: "others" },
    ]);
};
