import { Knex } from "knex";
import { DonationType } from "../controllers/logisticControllerMix";

export class LogisticMixService {
  constructor(private knex: Knex) { }
  table(trx: Knex | null) {
    let t = !trx ? this.knex : trx;
    return t("logistics");
  }
  table2(trx: Knex | null) {
    let t = !trx ? this.knex : trx;
    return t("logistic_items");
  }

  async createLogisticMix(
    room_input: string,
    building_input: string,
    street_input: string,
    district_input: string,
    contact_number_input: string,
    contact_name_input: string,
    confirmed_date_input: string,
    confirmed_session_input: string,
    user_id_input: number,
    donationList: DonationType[],
  ) {
    const trx = await this.knex.transaction();
    try {
      const logisticReturning = await this.table(trx).insert({
        room: room_input,
        building: building_input,
        street: street_input,
        district: district_input,
        contact_number: contact_number_input,
        contact_name: contact_name_input,
        confirmed_date: confirmed_date_input,
        confirmed_session: confirmed_session_input,
        user_id: user_id_input,
      }).returning("id");

      const logistic_id = logisticReturning[0].id
      for (let donation of donationList) {
        await this.table2(trx).insert({
          qty: donation.quantity,
          donate_item_id: donation.id,
          logistic_id: logistic_id,
        });
      }

      await trx.commit();
      return true;
    } catch (error) {
      console.log(error);
      trx.rollback();
      return false;
    }
  }

  async getAllLogisticInfo() {
    try {
      const rows = await this.knex
      .from('logistic_items')
      .innerJoin('logistics as logistic', 'logistic.id', 'logistic_items.logistic_id')
      .innerJoin('donate_items as donate_item', 'donate_item.id', 'logistic_items.donate_item_id')
      .select(
        'logistic_items.logistic_id',
        'logistic_items.donate_item_id',
        'logistic_items.qty as logistic_items_qty',
        'logistic.room as logistic_room',
        'logistic.building as logistic_building',
        'logistic.street as logistic_street',
        'logistic.district as logistic_district',
        'logistic.contact_number as logistic_contact_number',
        'logistic.contact_name as logistic_contact_name',
        'logistic.confirmed_date as logistic_confirmed_date',
        'logistic.confirmed_session as logistic_confirmed_session',
        'logistic.user_id as logistic_user_id',
        'donate_item.item_name as donate_item_item_name',
      )
        return rows
    } catch (error) {
      console.error(error); // handle errors
      throw new Error(`Error fetching items: ${error}`);
    }
  }



}
