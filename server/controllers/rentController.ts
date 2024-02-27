import express, { Request, Response } from "express";
import { rentItemService } from "../services/rentService";

export class RentController {
  router = express.Router();

  constructor(private rentService: rentItemService) {
    this.router.post("/rentResult", this.rentList.bind(this));
  }

  async rentList(req: Request, res: Response): Promise<void> {
    try {
      console.log("check req..body", req.body);
      let queryResult = await this.rentService.getRentResult();
      console.log("march_answer:X1", queryResult);
      res.json(queryResult);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
      return;
    }
  }
}
