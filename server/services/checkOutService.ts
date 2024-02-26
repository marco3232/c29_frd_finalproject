import { Knex } from "knex";


export class CheckOutService {
    constructor(private knex:Knex) {

        private checkoutTable() {
            return this.knex("checkouts")
        }
    }

    
}