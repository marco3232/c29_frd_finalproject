import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("logistics").del();
  await knex("logistic_items").del();
  await knex("donate_items").del();

  // Inserts seed entries for donate_items table
  const donateItems = await knex("donate_items").insert([
    {
      item_name: "輪椅",
      image: "../assets/輪椅.webp",
      rent_charge: 100,
      deposit_charge: 200,
    },
    {
      item_name: "電動輪椅",
      image: "./assets/電動輪椅.webp",
      rent_charge: 150,
      deposit_charge: 300,
    },
    {
      item_name: "穿手拐杖",
      image: "../assets/穿手拐杖.webp",
      rent_charge: 40,
      deposit_charge: 80,
    },
    {
      item_name: "四腳叉",
      image: "../assets/四腳叉.webp",
      rent_charge: 40,
      deposit_charge: 80,
    },
    {
      item_name: "步行架",
      image: "../assets/步行架.webp",
      rent_charge: 60,
      deposit_charge: 120,
    },
    {
      item_name: "沐浴椅",
      image: "../assets/沐浴椅.webp",
      rent_charge: 40,
      deposit_charge: 80,
    },
    {
      item_name: "便椅",
      image: "../assets/便椅.webp",
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

  // Inserts seed entries for logistics table
  const logistics = await knex("logistics").insert([
    {
      room: "3",
      building: "happy tower",
      street: "book street",
      district: "hk island",
      contact_number: "23456789",
      contact_name: "gu",
      confirmed_date: "1966-06-06",
      confirmed_session: "12:00",
      tried: true,
      rescheduled: true,
      user_id: 3,
    },
    {
      room: "15",
      building: "upSad tower",
      street: "gogo street",
      district: "kowloon island",
      contact_number: "98765432",
      contact_name: "HO HA",
      confirmed_date: "1999-09-09",
      confirmed_session: "00:00",
      tried: true,
      rescheduled: true,
      user_id: 2,
    },
  ]);

  // Inserts seed entries for logistic_items table
  await knex("logistic_items").insert([
    {
      logistic_id: logistics[0],
      donate_item_id: donateItems[0],
      qty: 1,
    },
    {
      logistic_id: logistics[1],
      donate_item_id: donateItems[1],
      qty: 2,
    },
  ]);
}
