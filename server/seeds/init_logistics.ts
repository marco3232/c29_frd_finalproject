import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("logistics").del();

    // Inserts seed entries
    await knex("logistics").insert([
        { room:"3",
          building:"happy tower",
          street:"book street",
          district:"hk island",
          contact_number:"23456789",
          contact_name:"gu",
          confirmed_date:"06-06-1966",
          confirmed_session:"12:00",
          tried:true,
          rescheduled:true,
          user_id: 3,
     },
    ]);
};
