import express, { Request, Response } from "express";
import { hashedPassword } from "../utils/hash";
import { AuthService } from "../services/authService";
import { AdminService } from "../services/adminService";

//-------------------------------------------------------------------------------------------

export default class AdminController {
  router = express.Router();

  constructor(private adminService: AdminService) {
    this.router.get("/adminCheckIn/:logisticsId", this.adminCheckInConfirm.bind(this));
    this.router.post("/logisticsOrder", this.logisticsOrder.bind(this));
    // this.router.post("/logisticsItem", this.logisticsItem.bind(this));

  }
  
    async adminCheckInConfirm(req: Request, res: Response): Promise<void> {
      try {
        const logisticsId = parseInt(req.params.logisticsId)
        let result = await this.adminService.adminCheckInConfirm(logisticsId)
  
        res.json(result)
      } catch (e: any) {
        res.status(400).json({ message: e.message });
        return;
      }
    }


  async logisticsOrder(req: Request, res: Response): Promise<void> {
    try {
      let result = await this.adminService.logisticsOrder();

      res.json(result.rows)
    } catch (e: any) {
      res.status(400).json({ message: e.message });
      return;
    }
  }
}
