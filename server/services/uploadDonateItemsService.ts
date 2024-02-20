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
}
