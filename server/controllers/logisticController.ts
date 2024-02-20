import express, { Request, Response } from "express";
import { LogisticService } from "../services/logisticsService";

export class LogisticController {
  router = express.Router();
  constructor(private logisticService: LogisticService) {
    this.router.post("/logistic", this.create);
    this.router.get("/finaldonateconfirm", this.list);
    this.router.put("/finaldonateconfirm/edit/:id", this.edit);
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
    } = req.body;

    let result = await this.logisticService.addLogistic(
      room,
      building,
      street,
      district,
      contact_number,
      contact_name,
      confirmed_date,
      confirmed_session,
      user_id
    );

    if (result) res.status(200).json({ message: "success" });
    else
      res
        .status(500)
        .json({ message: "internal server error,cannot insert new item" });
  };

  // list = async (req: Request, res: Response) => {
  //   let list = await this.logisticService.getLogistic();
  //   res.status(200).json({ data: list });
  // };

  list = async (req: Request, res: Response) => {
    // console.log("this is list", req.body);
    let list = await this.logisticService.getAll();
    res.status(200).json({ data: list });
  };

  edit = async (req: Request, res: Response) => {
    let id = req.params.id;
    let {
      room,
      building,
      street,
      district,
      contact_number,
      contact_name,
      confirmed_date,
      confirmed_session,
    } = req.body;

    let result = await this.logisticService.editLogistic(
      parseInt(id),
      room,
      building,
      street,
      district,
      contact_number,
      contact_name,
      confirmed_date,
      confirmed_session
    );
    if (result) res.status(200).json({ message: "success edit!" });
    else
      res
        .status(500)
        .json({ message: "internal server error,cannot update item name" });
  };
}
