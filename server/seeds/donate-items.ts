import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("donate_items").del();

    // Inserts seed entries
    await knex("donate_items").insert([
        { item_name: "輪椅" },
        { item_name: "電動輪椅" },
        { item_name: "穿手拐杖" },
        { item_name: "四腳叉" },
        { item_name: "步行架" },
        { item_name: "沐浴椅" },
        { item_name: "便椅" },
        { item_name: "高背椅" },
    ]);
};
