import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("logistic_items").del();
  await knex("donate_items").del();

  // Inserts seed entries
  await knex("donate_items").insert([
    {
      item_name: "輪椅",
      image: "/assets/donate_items_img/輪椅.webp",
      rent_charge: 100,
      deposit_charge: 200,
    },
    {
      item_name: "電動輪椅",
      image: "/assets/donate_items_img/電動輪椅.webp",
      rent_charge: 150,
      deposit_charge: 300,
    },
    {
      item_name: "穿手拐杖",
      image: "/assets/donate_items_img/穿手拐杖.webp",
      rent_charge: 40,
      deposit_charge: 80,
    },
    {
      item_name: "四腳叉",
      image: "/assets/donate_items_img/四腳叉.webp",
      rent_charge: 40,
      deposit_charge: 80,
    },
    {
      item_name: "步行架",
      image: "/assets/donate_items_img/步行架.webp",
      rent_charge: 60,
      deposit_charge: 120,
    },
    {
      item_name: "沐浴椅",
      image: "/assets/donate_items_img/沐浴椅.webp",
      rent_charge: 40,
      deposit_charge: 80,
    },
    {
      item_name: "便椅",
      image: "/assets/donate_items_img/便椅.webp",
      rent_charge: 70,
      deposit_charge: 140,
    },
    {
      item_name: "高背椅",
      image: "/assets/donate_items_img/高背椅.webp",
      rent_charge: 70,
      deposit_charge: 140,
    },
  ]);
}


