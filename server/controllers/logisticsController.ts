import express, { Request, Response } from "express";
import { LogisticService } from "../services/logisticsServices";

export class LogisticController {
  router = express.Router();
  constructor(private logisticService: LogisticService) {
    this.router.post("/logistic", this.create);
  }


  create = async (req: Request, res: Response) => {
    let {
      room_input,
      building_input,
      street_input,
      district_input,
      contact_number_input,
      contact_name_input,
      confirmed_date_input,
      confirmed_session_input,
    } = req.body;

    let result = await this.logisticService.createLogistic(
      room_input,
      building_input,
      street_input,
      district_input,
      contact_number_input,
      contact_name_input,
      confirmed_date_input,
      confirmed_session_input
    );

    if (result) res.status(200).json({ message: "success" });
    else
      res
        .status(500)
        .json({ message: "internal server error,cannot insert new item" });
  };


  createDonateItem = async (req: Request, res: Response) => {
    let { qty_input } = req.body;

    let result = await this.logisticService.createDonateItem(
      qty_input
    );

    if (result) res.status(200).json({ message: "success" });
    else
      res
        .status(500)
        .json({ message: "internal server error,cannot insert new item" });
  };

}
