import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("donate_items").del();

  // Inserts seed entries
  await knex("donate_items").insert([
    {
      item_name: "輪椅",
      image: "assets/輪椅.webp",
      rent_charge: 100,
      deposit_charge: 200,
    },
    {
      item_name: "電動輪椅",
      image: "/assets/電動輪椅.webp",
      rent_charge: 150,
      deposit_charge: 300,
    },
    {
      item_name: "穿手拐杖",
      image: "/assets/穿手拐杖.webp",
      rent_charge: 40,
      deposit_charge: 80,
    },
    {
      item_name: "四腳叉",
      image: "/assets/四腳叉.webp",
      rent_charge: 40,
      deposit_charge: 80,
    },
    {
      item_name: "步行架",
      image: "/assets/步行架.webp",
      rent_charge: 60,
      deposit_charge: 120,
    },
    {
      item_name: "沐浴椅",
      image: "/assets/沐浴椅.webp",
      rent_charge: 40,
      deposit_charge: 80,
    },
    {
      item_name: "便椅",
      image: "/assets/便椅.webp",
      rent_charge: 70,
      deposit_charge: 140,
    },
    {
      item_name: "高背椅",
      image: "/assets/高背椅.webp",
      rent_charge: 70,
      deposit_charge: 140,
    },
  ]);
}
