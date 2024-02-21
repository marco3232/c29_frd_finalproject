import { Knex } from "knex";
import { DonationType } from "../controllers/logisticControllerMix";

export class LogisticMixService {
  constructor(private knex: Knex) {}
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
    donationList: DonationType[]
  ) {
    const trx = await this.knex.transaction();
    try {
      const logisticReturning = await this.table(trx)
        .insert({
          room: room_input,
          building: building_input,
          street: street_input,
          district: district_input,
          contact_number: contact_number_input,
          contact_name: contact_name_input,
          confirmed_date: confirmed_date_input,
          confirmed_session: confirmed_session_input,
          user_id: user_id_input,
        })
        .returning("id");

      const logistic_id = logisticReturning[0].id;
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

  async getAllLogisticInfo(user_id:number) {
    try {
      const rows = await this.knex.raw(
        `
        select
		  di.item_name as item_name
    , li.qty as quantity
		, l.contact_name as name
		, l.contact_number as number
		, l.room || ', ' || l.building ||  ', ' || l.street ||  ', ' || l.district as address
		, u.email as email
    , l.purpose as purpose
    , l.district as district
    , l.confirmed_date as confirmed_date
    , l.confirmed_session as confirmed_session
        from logistic_items li 
        inner join logistics l on l.id = li.logistic_id
        inner join users u on u.id = l.user_id
        inner join donate_items di on di.id = li.donate_item_id
        where u.id = ?`,
        [user_id]
      );
      // console.log("rows??",rows)
      return rows;
    } catch (error) {
      console.error(error); // handle errors
      throw new Error(`Error fetching items: ${error}`);
    }
  }
}
