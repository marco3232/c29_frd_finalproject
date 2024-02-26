import express from "express";
import { CheckOutService } from "../services/checkOutService";


export interface CheckOutTransactionType {
    room: string;
    building: string;
    street: string;
    district: string;
    contact_number: string;
    contact_name: string;
    confirmed_date: string;
    confirmed_session: string;
  }
  export interface RentalType {
    id:number;
    itemName: string;
    quantity:number;
    deposit_charge:number;
    rent_charge:number;
  }

  export class CheckOutController {
    router = express.Router();
    constructor(private checkOutService: CheckOutService) {
        // this.router.post("/checkout",this.create);
    }

    create = async (req: Request, res: Response) => {
    }
}