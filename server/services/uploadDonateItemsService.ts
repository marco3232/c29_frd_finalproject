// import { Knex } from "knex";

// export class UploadDonateItemsService {
//   constructor(private knex: Knex) {}

//   private uploadDonateItemsTable() {
//     return this.knex("logistic_items");
//   }

//   async createDonateItem(
//     qty_input: number,
//     donate_item_id_input: number,
//     logistic_id_input: number
//   ) {
//     try {
//       await this.uploadDonateItemsTable().insert({
//         qty: qty_input,
//         donate_item_id: donate_item_id_input,
//         logistic_id: logistic_id_input,
//       });
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   }
// }

import { Knex } from "knex";

type ItemType = {
  id: number;
  item_name: string;
  qty: number;
};

export class UploadDonateItemsService {
  constructor(private knex: Knex) {}

  private uploadDonateItemsTable() {
    return this.knex("logistic_items");
  }

  async createDonateItem(
    items: Array<{ qty: number; donate_item_id: number; logistic_id: number }>
  ) {
    try {
      // Validation for each item in the array
      // items.forEach((item) => {
      //   if (!Number.isInteger(item.qty) || item.qty <= 0) {
      //     throw new Error("Invalid quantity");
      //   }

      //   if (!Number.isInteger(item.donate_item_id) || item.donate_item_id <= 0) {
      //     throw new Error("Invalid donate item ID");
      //   }

      //   if (!Number.isInteger(item.logistic_id) || item.logistic_id <= 0) {
      //     throw new Error("Invalid logistic ID");
      //   }
      // });

      // Bulk insert data using Knex
      await this.uploadDonateItemsTable().insert(items);

      return true;
    } catch (error) {
      // Improved error logging
      console.error("Error creating donate items:", error);
      return false;
    }
  }

  async getAll(): Promise<ItemType[]> {
    try {
      const rows: ItemType[] = await this.knex("donate_items")
        .select("*")
        .innerJoin(
          "logistic_items",
          "donate_items.id",
          "logistic_items.donate_item_id"
        );

      console.log(rows); // handle the result as needed

      return rows;
    } catch (error) {
      console.error(error); // handle errors
      throw new Error(`Error fetching items: ${error}`);
    }
  }
}
