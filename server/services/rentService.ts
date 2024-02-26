import { Knex } from "knex";

// type rentItemType = {
//     id: number,
//     item_name:string;
//     deposit_charge:number;
//     rent_charge:number,
//     serial_number:number
// }

export class rentItemService{
    constructor(private knex: Knex){}

    async getRentResult(){
        try{
        let rentResult= await this.knex("donate_items")
        .select("*")
        // .join("checkins")

        return rentResult
        }catch(error){
            throw new Error(`Error fetching items: ${error}`)
        }
    }
}
