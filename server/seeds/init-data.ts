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
        chi_surname: "管",
        chi_given_name: "理員",
        eng_surname: "Admin",
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
        eng_surname: "user",
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
        eng_surname: "Chan",
        eng_given_name: "Peter",
        mobile_phone: "90909090",
        address_proof_image_path: "/assets/batman.jpeg",
        role: "user",
      },
    ])
    .into("users");

    await knex("users")
    .insert([
      {
        email: "mary@gmail.com",
        password: await hashPassword("000"),
        address: "hongkong",
        chi_surname: "user",
        chi_given_name: "useruser",
        eng_surname: "Ho",
        eng_given_name: "Mary",
        mobile_phone: "30303030",
        address_proof_image_path: "/assets/batman.jpeg",
        role: "user",
      },
    ])
    .into("users");
}
