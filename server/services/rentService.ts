import { Knex } from "knex";

// type rentItemType = {
//     id: number,
//     item_name:string;
//     deposit_charge:number;
//     rent_charge:number,
//     serial_number:number
// }

export class rentItemService {
  constructor(private knex: Knex) {}

  async getRentResult() {
    try {
      let rentResult = `with checkin_record as (
            Select donate_item_id, count(donate_item_id) from checkins where order_status != 'checkout'  group by donate_item_id
         ) select checkin_record.*,  donate_items.item_name, donate_items.deposit_charge,donate_items.rent_charge,donate_items.image  from checkin_record  inner join  donate_items on donate_items.id = checkin_record.donate_item_id;
         `;
      const result = await this.knex.raw(rentResult);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching items: ${error}`);
    }
  }
}
