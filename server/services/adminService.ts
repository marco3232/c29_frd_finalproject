import { Knex } from "knex";

export class AdminService {
  public constructor(private knex: Knex) { }
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
      .select("role")

    return userInfoQuery;
  }

<<<<<<< HEAD
    async logistics(room:string, building:string){
      const infoQuery = await this.knex("logistics").select("*")

      console.log("march answer:",infoQuery)

      return infoQuery
    }
=======
  // multipleTable(){
  //   return this.knex("donate_items","logistic_items","logistics")
  // }
>>>>>>> 73e956b850ff543be87f649742616c7e243275ce
}
