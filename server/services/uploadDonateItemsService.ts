import { Knex } from "knex";

export class UploadDonateItemsService {
  constructor(private knex: Knex) {}

  private uploadDonateItemsTable() {
    return this.knex("logistic_items");
  }

  async createDonateItem(
    qty_input: number,
    donate_item_id_input: number,
    logistic_id_input: number
  ) {
    try {
      await this.uploadDonateItemsTable().insert({
        qty: qty_input,
        donate_item_id: donate_item_id_input,
        logistic_id: logistic_id_input,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
