import { Knex } from "knex";

export class LogisticService {
  constructor(private knex: Knex) {}

  private logisticsItemsTable() {
    return this.knex("logistics");
  }

  async createDonateItem(
    room_input: string,
    building_input: string,
    street_input: string,
    district_input: string,
    contact_number_input: number | null,
    contact_name_input: string,
    confirmed_date_input: Date,
    confirmed_session_input: string,
    user_id_input: number,
  ) {
    try {
      await this.logisticsItemsTable().insert({
        room: room_input,
        building: building_input,
        street: street_input,
        district: district_input,
        contact_number: contact_number_input,
        contact_name: contact_name_input,
        confirmed_date: confirmed_date_input,
        confirmed_session: confirmed_session_input,
        user_id: user_id_input,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
