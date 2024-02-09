import { Knex } from "knex";

// -----------------------------------------------------------------------------------------------

type ItemType = {
  item_name: string;
};

// -----------------------------------------------------------------------------------------------

export class ItemService {
  constructor(private knex: Knex) { }
  table() {
    return this.knex("donate_items");
  }

  async getAll() {
    let rows: ItemType[] = await this.table().select("item_name").orderBy("id", "asc");

    return rows;
  }

}

// -----------------------------------------------------------------------------------------------