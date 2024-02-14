import { Knex } from "knex";

export class LogisticService {
  constructor(private knex: Knex) {}
  table(trx: Knex | null) {
    let t = !trx ? this.knex : trx;
    return t("logistics");
  }
  table2(trx: Knex | null) {
    let t = !trx ? this.knex : trx;
    return t("logistic_items");
  }

  async createLogistic(
    room_input: string,
    building_input: string,
    street_input: string,
    district_input: string,
    contact_number_input: number,
    contact_name_input: string,
    confirmed_date_input: Date,
    confirmed_session_input: string,
    user_id_input: number,
    qty_input: number,
    donate_item_id_input: number,
    logistic_id_input: number
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
      });

      await this.table2(trx).insert({
        qty: qty_input,
        donate_item_id: donate_item_id_input,
        logistic_id: logistic_id_input,
      });
      await trx.commit();
      return true;
    } catch (error) {
      console.log(error);
      trx.rollback();
      return false;
    }
  }
}
