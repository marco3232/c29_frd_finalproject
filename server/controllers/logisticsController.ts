import express, { Request, Response } from "express";
import { LogisticService } from "../services/logisticsServices";

export class LogisticController {
  router = express.Router();
  constructor(private logisticService: LogisticService) {
    this.router.post("/logistic", this.create);
  }


  create = async (req: Request, res: Response) => {
    let {
      room,
      building,
      street,
      district,
      contact_number,
      contact_name,
      confirmed_date,
      confirmed_session,
      user_id,
      qty,
      donate_item_id,
      logistic_id
    } = req.body;

    let result = await this.logisticService.createLogistic(
      room,
      building,
      street,
      district,
      contact_number,
      contact_name,
      confirmed_date,
      confirmed_session,
      user_id,
      qty,
      donate_item_id,
      logistic_id
    );


    if (result) res.status(200).json({ message: "success" });
    else
      res
        .status(500)
        .json({ message: "internal server error,cannot insert new item" });
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

}
