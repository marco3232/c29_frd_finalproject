import express, { Request, Response } from "express";
import { CheckInService } from "../services/checkInService";

export class CheckInController {
  router = express.Router();
  constructor(private checkInService: CheckInService) {
    this.router.get("/checkin", this.list);
    this.router.get("/precheckin", this.precheckinlist);
    this.router.post("/checkin", this.create);
  }

  list = async (req: Request, res: Response) => {
    // console.log("this is list", req.body);
    let list = await this.checkInService.getAll();
    res.status(200).json({ data: list });
  };

  create = async (req: Request, res: Response) => {
    try {
      const {
        item_image_path,
        // serial_number,
        user_id,
        logistic_id,
        donate_item_id,
        goods_status
      } = req.body;
      // Call the service method to add check-in
      const result = await this.checkInService.addCheckIn(
        item_image_path,
        // serial_number,
        user_id,
        logistic_id,
        donate_item_id,
        goods_status
      );

      if (result) {
        return res.status(201).json({ message: "Check-in added successfully" });
      } else {
        return res.status(500).json({ message: "Failed to add check-in" });
      }
    } catch (error) {
      console.error("Error adding check-in:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  precheckinlist = async (req: Request, res: Response) => {
    try {
      const { 
        user_id, 
        logistic_id, 
        donate_item_id 
    } = req.body;

      const result = await this.checkInService.getPreCheckIn( 
        user_id, 
        logistic_id, 
        donate_item_id );


      if (result) {
        return  res.status(200).json({ data: result });
       } else {
        return res
          .status(500)
          .json({ message: "internal server error,cannot insert new item" });
       }
        
    } catch (error) {
      console.error("Error adding check-in:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
