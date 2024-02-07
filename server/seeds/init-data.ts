import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            email: "sexy@gmail.com",
            password: await hashPassword("123456"),
            address: "Heaven_road_9527",
            chi_surname: "好",
            chi_given_name: "性感",
            eng_surname: "Hao",
            eng_given_name: "sexy",
            mobile_phone: "98765432",
            address_proof_image_path: "/assets/batman.jpeg",
            status: "verified"
        }
    ]).into("users");
};
