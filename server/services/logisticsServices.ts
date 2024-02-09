import { Knex } from "knex";

export class LogisticService {
  constructor(private knex: Knex) { }
  table() {
    return this.knex("logistics");
  }
  async createLogistic(
    room_input: string,
    building_input: string,
    street_input: string,
    district_input: string,
    contact_number_input: number,
    contact_name_input: string,
    confirmed_date_input: Date,
    confirmed_session_input: string
  ) {
    try {
      await this.table().insert({
        room: room_input,
        building: building_input,
        street: street_input,
        district: district_input,
        contact_number: contact_number_input,
        contact_name: contact_name_input,
        confirmed_date: confirmed_date_input,
        confirmed_session: confirmed_session_input,
      });
      console.log("haha")
      console.log()
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
