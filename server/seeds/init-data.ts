import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries

  // Inserts seed entries
  await knex("users")
    .insert([
      {
        email: "admin@gmail.com",
        password: await hashPassword("123456"),
        address: "Heaven_road_9527",
        chi_surname: "李",
        chi_given_name: "嘉超",
        eng_surname: "Li",
        eng_given_name: "Admin",
        mobile_phone: "98765432",
        address_proof_image_path: "/assets/batman.jpeg",
        role: "admin",
      },
    ])
    .into("users");

  // -------------------------------------


  await knex("users")
    .insert([
      {
        email: "user@gmail.com",
        password: await hashPassword("123456"),
        address: "hongkong",
        chi_surname: "user",
        chi_given_name: "useruser",
        eng_surname: "sad",
        eng_given_name: "User",
        mobile_phone: "22223333",
        address_proof_image_path: "/assets/batman.jpeg",
        role: "user",
      },
    ])
    .into("users");

  await knex("users")
    .insert([
      {
        email: "peter@gmail.com",
        password: await hashPassword("000"),
        address: "hongkong",
        chi_surname: "user",
        chi_given_name: "useruser",
        eng_surname: "sad",
        eng_given_name: "User",
        mobile_phone: "90909090",
        address_proof_image_path: "/assets/batman.jpeg",
        role: "user",
      },
    ])
    .into("users");
}
