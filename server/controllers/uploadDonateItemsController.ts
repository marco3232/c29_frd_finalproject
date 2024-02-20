import express, { Request, Response } from "express";
import { UploadDonateItemsService } from "../services/uploadDonateItemsService";

export class UploadDonateItemsController {
  router = express.Router();
  constructor(private uploadDonateItemsService: UploadDonateItemsService) {
    this.router.post("/upload", this.create);
    // this.router.get("/upload/itemlist", this.list);
  }

  create = async (req: Request, res: Response) => {
    let items = req.body;
    let result = await this.uploadDonateItemsService.createDonateItem(
      items
    );

    if (result) res.status(200).json({ message: "success" });
    else
      res
        .status(500)
        .json({ message: "internal server error,cannot insert new item" });
  };


  
  
  
}
