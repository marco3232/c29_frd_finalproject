import { Knex } from "knex";
import { generateSerialNumber } from "../utils/serial_number";

// export type CheckInType = {
//     item_image_path:string;
//     serial_number:number;
//     user_id:number;
// }

export class CheckInService {
    constructor(private knex: Knex) {}

    private checkinTable() {
        return this.knex("checkins");
    }

    async getAll() {
        let rows = await this.checkinTable().select("*").from("checkins")
        
        return rows
    }

    async getPreCheckIn(user_id:number, 
        logistic_id:number, 
        donate_item_id:number ){
        let result = await this.knex
        ('logistic_items')
        .innerJoin('donate_items as donate_item', 'donate_item.id', 'logistic_items.donate_item_id')
        .innerJoin('logistics as logistic', 'logistic.id', 'logistic_items.logistic_id')
        .select(
        'logistic_items.donate_item_id',
        'logistic_items.logistic_id',
        'donate_item.item_name as donate_item_item_name',
        'logistic.user_id as logistic_user_id',
        )
        return result
    }
    async addCheckIn(
        item_image_path: string,
        user_id: number,
        logistic_id: number,
        donate_item_id: number,
        goods_status: string
    ) {
        try {
            if (goods_status === "repairing") {
                // If goods_status is "repairing", do not insert into the database
                console.log("Goods are being repaired. Not inserting into the database.");
                return false;
            }
    
            // Query the database to fetch user_id, logistic_id, and donate_item_id
            const returningId: any[] = await this.knex('logistic_items')
            .select(
              'logistic_items.donate_item_id',
              'logistic_items.logistic_id',
              'donate_items.item_name as donate_item_item_name',
              'logistics.user_id as logistic_user_id'
            )
            .innerJoin('donate_items', 'donate_items.id', 'logistic_items.donate_item_id')
            .innerJoin('logistics', 'logistics.id', 'logistic_items.logistic_id')
            .where('logistics.user_id', user_id)
            .where('logistic_items.logistic_id', logistic_id)
            .where('logistic_items.donate_item_id', donate_item_id);
          
    
            if (returningId.length === 0) {
                throw new Error('Could not find corresponding IDs in the database.');
            }
    
            const { donate_item_id: returned_donate_item_id, logistic_id: returned_logistic_id, logistic_user_id } = returningId[0];
    
            // Insert the data into this.checkinTable()
            await this.checkinTable().insert({
                item_image_path: item_image_path,
                serial_number: generateSerialNumber(),
                user_id: logistic_user_id, // assuming you want logistic_user_id here
                logistic_id: returned_logistic_id,
                donate_item_id: returned_donate_item_id,
                goods_status:goods_status
            });
    
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
}