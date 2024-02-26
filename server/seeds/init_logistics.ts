import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("logistics").del();
  await knex("logistic_items").del();


  // Inserts seed entries for logistics table
  const logistics = await knex("logistics").insert([
    {
      room: "3",
      building: "happy tower",
      street: "book street",
      district: "hk island",
      contact_number: "23456789",
      contact_name: "gu",
      confirmed_date: "3/13/2024",
      confirmed_session: "11:30:00 AM",
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
      confirmed_date: "4/20/2024",
      confirmed_session: "2:20:00 PM",
      tried: true,
      rescheduled: true,
      user_id: 2,
    },
  ]);

  await knex("logistic_items").insert([
    {
      logistic_id: "1",
      donate_item_id: "1",
      qty: 1,
    },
    {
      logistic_id: "2",
      donate_item_id: "2",
      qty: 1,
    },
    {
      logistic_id: "2",
      donate_item_id: "2",
      qty: 1,
    }
  ]);

}
