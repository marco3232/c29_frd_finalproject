import { Knex } from "knex";
import { CheckInType } from "../controllers/checkOutController";

export class CheckOutService {
  constructor(private knex: Knex) { }
  table(trx: Knex | null) {
    let checkOut = !trx ? this.knex : trx;
    return checkOut("logistics");
  }
  table2(trx: Knex | null) {
    let checkOut = !trx ? this.knex : trx;
    return checkOut("checkouts");
  }

  async createCheckOut(
    room_input: string,
    building_input: string,
    street_input: string,
    district_input: string,
    contact_number_input: string,
    contact_name_input: string,
    confirmed_date_input: string,
    confirmed_session_input: string,
    user_id_input: number,
    checkInIds: number[]
  ) {
    const trx = await this.knex.transaction();
    try {
      await this.table(trx).insert({
        room: room_input,
        building: building_input,
        street: street_input,
        district: district_input,
        contact_number: contact_number_input,
        contact_name: contact_name_input,
        confirmed_date: confirmed_date_input,
        confirmed_session: confirmed_session_input,
        user_id: user_id_input,
        purpose: "租借",
        status: "in-transit"
      });

      //   for (let checkout of rentalList) {
      //     if (checkout.id > 1) {
      //       for (let i = 0; i < checkout.id; i++) {
      //         await this.table2(trx).insert({
      //           checkin_id: 1,
      //           user_id: user_id_input,
      //           type: "rent",
      //           status: "in-use",
      //         });
      //       }
      //     }
      //   }
      for (let checkInId of checkInIds) {
        await this.table2(trx).insert({
          checkin_id: checkInId,
          user_id: user_id_input,
          type: "rent",
          status: "in-use",
        });
      }

      // for (let rental of rentalList) {
      // console.log("check rental", rental);
      //     await this.table2(trx).insert({
      //         checkin_id: rental.checkin_id,
      //     })
      // }
      await trx.commit();
      return true;
    } catch (error) {
      console.log(error);
      trx.rollback();
      return false;
    }
  }
}
