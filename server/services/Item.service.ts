import { Knex } from "knex";

type ItemType = {
  item_name: string;
};

export class ItemService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("donate_items");
  }

  async getAll() {
    let rows: ItemType[] = await this.table().select("item_name").orderBy("id", "asc");

    return rows;
  }

  //   async createItem(title_input: string, description_input: string) {
  //     try {
  //       await this.table().insert({
  //         title: title_input,
  //         description: description_input,
  //         status: false,
  //       });
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   }

  //   async deleteItem(target_id: number) {
  //     try {
  //       await this.table().where("id", target_id).del();
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   }

  //   async updateStatus(target_id: number) {
  //     try {
  //       let result = await this.table().select("status").where("id", target_id);
  //       console.log("check status", result[0].status);
  //       let newStatus = !result[0].status;
  //       await this.table().update({ status: newStatus }).where("id", target_id);
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   }

  //   async updateName(target_id: number, new_input: string) {
  //     try {
  //       await this.table().update({ title: new_input }).where("id", target_id);
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   }
}
