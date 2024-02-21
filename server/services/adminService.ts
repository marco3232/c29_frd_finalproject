import { Knex } from "knex";

export class AdminService {
  public constructor(private knex: Knex) {}
  table() {
    return this.knex("users");
  }

  async userInfo(
    eng_surname: string,
    address: string,
    eng_given_name: string,
    chi_surname: string,
    chi_given_name: string,
    email: string,
    mobile_phone: number,
    role: string,
    address_proof_image_path: string
  ) {
    const userInfoQuery = await this.table()
      .select("id")
      .select("email")
      .select("address")
      .select("chi_surname")
      .select("chi_given_name")
      .select("eng_surname")
      .select("eng_given_name")
      .select("mobile_phone")
      .select("role");

    return userInfoQuery;
  }

  async logistics() {
    try {
      // const infoQuery = await this.knex("logistics")
      //   .join("users", "logistics.user_id", "users.id")
      // .select("logistics.users_id",);
      const infoQuery = await this.knex("logistics")
        .join("users", "logistics.user_id", "user.id")
        .select("logistics.user_id","user.id")
        .where("logistics.user_id","user_id")

        
      console.log("march answer:", infoQuery);

      return infoQuery;
    } catch (e) {
      throw new Error(`Error fetching items:${e}`);
    }
  }
}
