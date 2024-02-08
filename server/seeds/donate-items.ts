import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("donate_items").del();

    // Inserts seed entries
    await knex("donate_items").insert([
        { item_name: "輸椅" },
        { item_name: "電動輪椅" },
        { item_name: "拐杖" },
        { item_name: "步行架" },
        { item_name: "沐浴椅" },
        { item_name: "營養食品" },
        { item_name: "成人紙尿片" },
        { item_name: "濕紙巾" },
        { item_name: "血壓計" },
        { item_name: "護理床" },
        { item_name: "潤膚霜" },
        { item_name: "其他" },
    ]);
};
