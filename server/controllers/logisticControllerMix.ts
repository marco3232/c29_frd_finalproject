import express, { Request, Response } from "express";
import { LogisticMixService } from "../services/logisticServicesMix";


export class LogisticMixController {
  router = express.Router();
  constructor(private logisticMixService: LogisticMixService) {
    this.router.post("/logisticmix", this.create);
    // this.router.get("/finaldonateconfirm", this.list)
    // this.router.put("/finaldonateconfirm/edit/{id}", this.edit)
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
      logistic_id,
    } = req.body;
    console.log("check req body",req.body)

    let result = await this.logisticMixService.createLogisticMix(
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
    console.log("check result",result)


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
