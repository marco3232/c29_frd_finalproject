import express, { Request, Response } from "express";
import { UploadDonateItemsService } from "../services/uploadDonateItemsService";

export class UploadDonateItemsController {
  router = express.Router();
  constructor(private uploadDonateItemsService: UploadDonateItemsService) {
    this.router.post("/upload", this.create);
    this.router.get("/upload/items", this.list);
  }

  create = async (req: Request, res: Response) => {
    let { qty, donate_item_id, logistic_id } = req.body;
    let result = await this.uploadDonateItemsService.createDonateItem(
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

  list = async (req: Request, res: Response) => {
    // console.log("this is list", req.body);
    let list = await this.uploadDonateItemsService.getAll();
    res.status(200).json({ data: list });
  };
}
