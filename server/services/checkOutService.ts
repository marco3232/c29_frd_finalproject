import { Knex } from "knex";

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
        purpose:"租借",
        status:"in-transit"
      })
      .returning("id");

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
    const logistic_id = logisticReturning[0].id;
      for (let checkInId of checkInIds) {
            await this.table2(trx).insert({
            logistic_id:logistic_id,
            checkin_id: checkInId,
            user_id: user_id_input,
            type: "rent",
            status: "in-use",
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


  async getCheckOutInfo(userId: number) {
    try {
      const rows = await this.knex.raw(
        `  select
          checkouts.logistic_id
          , checkouts.checkin_id
          , l.uuid as uuid
          , l.purpose as purpose
          , l.room || ', ' || l.building || ', ' || l.street || ', ' || l.district as address
          , l.contact_number as number
          , l.contact_name as name
          , l.confirmed_date as confirmed_date
          , l.confirmed_session as confirmed_session
          , l.user_id as logistic_user_id
          , checkins.donate_item_id as checkin_donate_item_id
          , donate_items.item_name as item_name
          , donate_items.deposit_charge as deposit_charge
          , donate_items.rent_charge as rent_charge
          from checkouts
          inner join logistics l on l.id = checkouts.logistic_id
          inner join checkins as checkins on checkins.id = checkouts.checkin_id
          inner join donate_items as donate_items on donate_items.id = checkins.donate_item_id
          where l.user_id = ?`,

        [userId]
      );

      // console.log("rows??", rows);
      return rows;
    } catch (error) {
      console.error(error); // handle errors
      throw new Error(`Error fetching items: ${error}`);
    }
  }

  async getTotalAmount(userId: number) {
    try {
      const rows = await this.knex.raw(
        ` SELECT 
        logistic_id,
        max(cast(uuid as varchar)) as uuid,
        max(purpose) as purpose,
        max(item_name) as item_name,
        sum(deposit_charge) as sum_deposit_charge,
        sum(rent_charge) as sum_rent_charge,
        sum(deposit_charge + rent_charge) as total_amount, -- Sum of deposit_charge and rent_charge
        max(address) as address,
        max(name) as name,
        max(number) as number,
        max(confirmed_date) as confirmed_date,
        max(confirmed_session) as confirmed_session
    FROM
        (SELECT
            checkouts.logistic_id,
            checkouts.checkin_id,
            l.uuid as uuid,
            l.purpose as purpose,
            l.room || ', ' || l.building || ', ' || l.street || ', ' || l.district as address,
            l.contact_number as number,
            l.contact_name as name,
            donate_items.item_name as item_name,
            donate_items.deposit_charge as deposit_charge,
            donate_items.rent_charge as rent_charge,
            l.confirmed_date as confirmed_date,
            l.confirmed_session as confirmed_session,
            l.user_id as logistic_user_id,
            checkins.donate_item_id as checkin_donate_item_id
        FROM
            checkouts
        INNER JOIN
            logistics l ON l.id = checkouts.logistic_id
        INNER JOIN
            checkins ON checkins.id = checkouts.checkin_id
        INNER JOIN
            donate_items ON donate_items.id = checkins.donate_item_id
        WHERE
            l.user_id = ?) AS subquery
    GROUP BY
        logistic_id;
    `,

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
