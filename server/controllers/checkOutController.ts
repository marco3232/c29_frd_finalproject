import express, { Request, Response } from "express";
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
  export interface CheckInType {
    checkin_id:number;
    // itemName: string;
    // quantity:number;
    // deposit_charge:number;
    // rent_charge:number;
  }

  export class CheckOutController {
    router = express.Router();
    constructor(private checkOutService: CheckOutService) {
        this.router.post("/checkout",this.create);
    }

    create = async (req: Request, res: Response) => {
      try {
        let {
          rentalList,
          checkoutTransaction,
        } : { rentalList : CheckInType[]; checkoutTransaction: CheckOutTransactionType }= 
        req.body;
        console.log("check req body",req.body)
        const user_id = req.user?.id;
        let result = await this.checkOutService.createCheckOut(
          checkoutTransaction.room,
          checkoutTransaction.building,
          checkoutTransaction.street,
          checkoutTransaction.district,
          checkoutTransaction.contact_number,
          checkoutTransaction.contact_name,
          checkoutTransaction.confirmed_date,
          checkoutTransaction.confirmed_session,
          user_id!,
          rentalList
        );
        console.log("check result",result)

        if (result) res.status(200).json({message: "success"});
        else
          res.status(500).json({message: "internal server error, cannot insert new item"});
      } catch (error) {
        console.log(error);
        res.status(500).json({message: error})

      }
    };
}