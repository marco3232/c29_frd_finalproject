import { Knex } from "knex";
import { userInfo } from "os";

export type LogisticType = {
  room: string;
  building: string;
  street: string;
  district: string;
  contact_number: number | null;
  contact_name: string;
  confirmed_date: string;
  confirmed_session: string;
  user_id: number;
};

type ItemType = {
  id: number;
  item_name: string;
  qty: number;
};

export class LogisticService {
  constructor(private knex: Knex) { }

  private logisticTable() {
    return this.knex("logistics");
  }

  async addLogistic(
    room_input: string,
    building_input: string,
    street_input: string,
    district_input: string,
    contact_number_input: number | null,
    contact_name_input: string,
    confirmed_date_input: string,
    confirmed_session_input: string,
    user_id_input: number
  ) {
    try {
      await this.logisticTable().insert({
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

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAll() {
    try {
      const rows: ItemType[] = await this.knex("donate_items")
        .select("*")
        .join(
          "logistic_items",
          "donate_items.id",
          "=",
          "logistic_items.donate_item_id"
        )
        .join("logistics", "logistics.id", "=", "logistic_items.logistic_id")
      return rows;
    } catch (error) {
      console.error(error); // handle errors
      throw new Error(`Error fetching items: ${error}`);
    }
  }


  async editLogistic(
    targetId: number,
    room_input?: string,
    building_input?: string,
    street_input?: string,
    district_input?: string,
    contact_number_input?: number | null,
    contact_name_input?: string,
    confirmed_date_input?: string,
    confirmed_session_input?: string
  ) {
    try {
      await this.logisticTable()
        .update({
          room: room_input,
          building: building_input,
          street: street_input,
          district: district_input,
          contact_number: contact_number_input,
          contact_name: contact_name_input,
          confirmed_date: confirmed_date_input,
          confirmed_session: confirmed_session_input,
        })
        .where("id", targetId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
