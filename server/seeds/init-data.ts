import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            email: "admin01@gmail.com",
            password: await hashPassword("123456"),
            address: "Heaven_road_9527",
            chi_surname: "李",
            chi_given_name: "嘉超",
            eng_surname: "Pi",
            eng_given_name: "kachu",
            mobile_phone: "98765432",
            address_proof_image_path: "/assets/batman.jpeg",
            status: "verified"
        }
    ]).into("users");


    // -------------------------------------
    await knex("users").insert([
        {
            email: "testing@gmail.com",
            password: await hashPassword("123456"),
            address: "hongkong",
            chi_surname: "田",
            chi_given_name: "比比",
            eng_surname: "Ho",
            eng_given_name: "lo",
            mobile_phone: "23456789",
            address_proof_image_path: "/assets/batman.jpeg",
            status: "verified"
        }
    ]).into("users");
};

