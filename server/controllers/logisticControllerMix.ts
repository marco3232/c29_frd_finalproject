import express, { Request, Response } from "express";
import { LogisticMixService } from "../services/logisticServicesMix";

export interface TransactionType {
  room: string;
  building: string;
  street: string;
  district: string;
  contact_number: string;
  contact_name: string;
  confirmed_date: string;
  confirmed_session: string;
}
export interface DonationType {
  id: number;
  itemName: string;
  quantity: number;
}

export class LogisticMixController {
  router = express.Router();
  constructor(private logisticMixService: LogisticMixService) {
    this.router.post("/logisticmix", this.create);
    this.router.get("/finaldonateconfirmMix", this.list)
    // this.router.put("/finaldonateconfirm/edit/{id}", this.edit)
  }

  create = async (req: Request, res: Response) => {
    try {
      let {
        donationList,
        transaction,
      }: { donationList: DonationType[]; transaction: TransactionType } =
        req.body;
      // console.log("check req body", req.body);
      const user_id = req.user?.id;
      let result = await this.logisticMixService.createLogisticMix(
        transaction.room,
        transaction.building,
        transaction.street,
        transaction.district,
        transaction.contact_number,
        transaction.contact_name,
        transaction.confirmed_date,
        transaction.confirmed_session,
        user_id!,
        donationList
      );
      // console.log("check result", result);

      if (result) res.status(200).json({ message: "success" });
      else
        res
          .status(500)
          .json({ message: "internal server error,cannot insert new item" });
    } catch (e: any) {
      console.log(e);
      res
          .status(500)
          .json({ message: e.message });
    }
  };

  // createDonateItem = async (req: Request, res: Response) => {
  //   let { qty_input } = req.body;

  //   let result = await this.logisticService.createDonateItem(
  //     qty_input
  //   );

  //   if (result) res.status(200).json({ message: "success" });
  //   else
  //     res
  //       .status(500)
  //       .json({ message: "internal server error,cannot insert new item" });
  // };

  list = async (req:Request, res: Response) => {
    let list = await this.logisticMixService.getAllLogisticInfo(3)
    res.status(200).json({data: list})
  }
}
