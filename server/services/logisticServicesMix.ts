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

      // const logistic_id = logisticReturning[0].id;
      // for (let donation of donationList) {
      //   console.log("check donation",donation)
      //   await this.table2(trx).insert({
      //     qty: donation.quantity,
      //     donate_item_id: donation.id,
      //     logistic_id: logistic_id,
      //   });
      //   console.log("check d id",donation.id)
      // }

      const logistic_id = logisticReturning[0].id;
      for (let donation of donationList) {
      console.log("check donation", donation);
      if (donation.quantity > 1) {
        // If quantity is more than 1, break it down into individual entries
        for (let i = 0; i < donation.quantity; i++) {
            await this.table2(trx).insert({
                qty: 1, // Insert 1 quantity for each iteration
                donate_item_id: donation.id,
                logistic_id: logistic_id,
            });
        }
    } else {
        // If quantity is 1, insert as is
        await this.table2(trx).insert({
            qty: donation.quantity,
            donate_item_id: donation.id,
            logistic_id: logistic_id,
          });
        }
      }
      await trx.commit();
      return true;
    } catch (error) {
      console.log(error);
      trx.rollback();
      return false;
    }
  }

  async getAllLogisticInfo(userId: number) {
    try {
      const rows = await this.knex.raw(
        `  SELECT
        logistic_id,
        max(cast(uuid as varchar)) as uuid,
        max(purpose) as purpose,
        max(address) as address,
        max(name) as name,
        max(number) as number,
        max(confirmed_date) as confirmed_date,
        max(confirmed_session) as confirmed_session,
        string_agg(item_details, '; ') as item_list
        FROM
        (SELECT
        di.item_name || ' X ' || SUM(li.qty) as item_details,
        l.uuid as uuid,
        l.id as logistic_id,
        l.contact_name as name,
        l.contact_number as number,
        l.room || ', ' || l.building || ', ' || l.street || ', ' || l.district as address,
        u.email as email,
        l.purpose as purpose,
        l.district as district,
        l.confirmed_date as confirmed_date,
        l.confirmed_session as confirmed_session
        FROM logistic_items li
        INNER JOIN logistics l ON l.id = li.logistic_id
        INNER JOIN users u ON u.id = l.user_id
        INNER JOIN donate_items di ON di.id = li.donate_item_id
        WHERE u.id = ?
        GROUP BY di.item_name, l.uuid, l.id, l.contact_name, l.contact_number, l.room, l.building, l.street, l.district, u.email, l.purpose, l.district, l.confirmed_date, l.confirmed_session) AS distinct_items
        GROUP BY logistic_id;`,

        [userId]
      );

      // console.log("rows??", rows);
      return rows;
    } catch (error) {
      console.error(error); // handle errors
      throw new Error(`Error fetching items: ${error}`);
    }
  }
}
