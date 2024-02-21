import express, { Request, Response } from "express";
import { hashedPassword } from "../utils/hash";
import { AuthService } from "../services/authService";
import { AdminService } from "../services/adminService";

//-------------------------------------------------------------------------------------------

export default class AdminController {
  router = express.Router();

  constructor(private adminService: AdminService) {
    this.router.get("/userInfo", this.userInfo.bind(this));
    // this.router.post("/logistics", this.logistics.bind(this));
  }

  async userInfo(req: Request, res: Response): Promise<void> {
    try {
      let {
        email,
        address,
        chi_surname,
        chi_given_name,
        eng_surname,
        eng_given_name,
        mobile_phone,
        address_proof_image_path,
        role,
      } = req.body;
      let userData = await this.adminService.userInfo(
        email,
        address,
        chi_surname,
        chi_given_name,
        eng_surname,
        eng_given_name,
        mobile_phone,
        address_proof_image_path,
        role,
      );

      res.json(userData);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
      return;
    }
  }

  // async logistics(req:Request, res:Response):Promise<void>{
  //   try{
  //     let {room,building}=req.body;

  //     let logisticsData = await this.adminService.logistics(
  //       room,
  //       building,
  //     );
  //       res.json(logisticsData);

  //   }catch(error){
  //     res.status(400).json({message: "i m died"})
  //   }
  // }
}
