import { Knex } from "knex";



export class UploadDonateItemsService {
  constructor(private knex: Knex) {}

  private uploadDonateItemsTable() {
    return this.knex("logistic_items");
  }

  async createDonateItem( items:Array<{
    qty_input: number,
    donate_item_id_input: number,
    logistic_id_input: number
  }>
  ) {
    try {
      await this.uploadDonateItemsTable().insert(items);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  
}
