import express, { Request, Response } from "express";
import { CheckOutService } from "../services/checkOutService";
import { CheckInService } from "../services/checkInService";

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
// export interface CheckInType {
//   id: number;
//   // itemName: string;
//   // quantity:number;
//   // deposit_charge:number;
//   // rent_charge:number;
// }

export class CheckOutController {
  router = express.Router();
  constructor(private checkOutService: CheckOutService, private checkInService: CheckInService) {
    this.router.post("/checkout", this.create);
  }

  create = async (req: Request, res: Response) => {
    try {
      let {donateItemIds, checkoutTransaction} : {donateItemIds: number[], checkoutTransaction: CheckOutTransactionType} = req.body;
      const userId = req.user?.id!

  
      const checkInIds: number[] = [];
      for(let donateItemId of donateItemIds) {
        const checkInId = await this.checkInService.getCheckInIdByDonateItemId(donateItemId);
        checkInIds.push(checkInId);
      }
    
      console.log({
        donateItemIds,
        checkoutTransaction,
        checkInIds
      })
      // console.log("check req body checkout", req.body);
      // const user_id = req.user?.id;
      let result = await this.checkOutService.createCheckOut(
        checkoutTransaction.room,
        checkoutTransaction.building,
        checkoutTransaction.street,
        checkoutTransaction.district,
        checkoutTransaction.contact_number,
        checkoutTransaction.contact_name,
        checkoutTransaction.confirmed_date,
        checkoutTransaction.confirmed_session,
        userId,
        checkInIds
      );
      // console.log("check result", rentalList);
      // console.log("check user", user_id);

      // if (result) res.status(200).json({ message: "success" });
      // else
      //   res
      //     .status(500)
      //     .json({ message: "internal server error, cannot insert new item" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  };
}
function getCheckInIdByDonateItemId(arg0: number) {
  throw new Error("Function not implemented.");
}

