import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            first_name: "Hao",
            last_name: "Sexy",
            email: "sexy@gmail.com",
            phone: "98765432",
            password: await hashPassword("123456"),
            role: "u",
        },
        { 
            eng_surname:"haha",
            eng_given_name:"baba",
            email:"haha@gmail.com",
            password:await hashPassword("123456"),
            mobile_phone:"98765432",
        }
    ]).into("users");
};
