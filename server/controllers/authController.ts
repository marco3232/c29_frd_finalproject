import express, { Request, Response } from "express";
import { hashedPassword } from "../utils/hash";
import { AuthService } from "../services/authService";

//-------------------------------------------------------------------------------------------

export default class AuthController {
  router = express.Router();

  constructor(private authService: AuthService) {
    this.router.post("/login", this.login.bind(this));
    this.router.post("/register", this.register.bind(this));
    this.router.get("/user", this.getUserInfo.bind(this));
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body.email || !req.body.password || !req.body.mobile_phone) {
        res
          .status(400)
          .json({
            message: "Email, password, and mobile phone cannot be empty",
          });
        return;
      }

      if (req.body.mobile_phone.toString().length !== 8) {
        res.status(400).json({ message: "Phone number must be 8 digits" });
        return;
      }

      let countOfEmailRecord: number = await this.authService.getUser(
        req.body.email
      );
      console.log({ countOfEmailRecord });
      if (countOfEmailRecord > 0) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }
      let hashed: string = await hashedPassword(req.body.password);

      await this.authService.register(
        req.body.eng_surname,
        req.body.eng_given_name,
        req.body.chi_surname,
        req.body.chi_given_name,
        req.body.email,
        req.body.mobile_phone,
        hashed
      );

      res.json({ message: "Register success" });
      return;
    } catch (e: any) {
      res.status(400).json({ message: e.message });
      return;
    }
  }

  // -------------------------------------------------------------------------

  async login(req: Request, res: Response) {
    let { email, password } = req.body;
    let result = await this.authService.login(email, password);

    if (result.flag) {
      console.log("authController Check Login . Role: ", result.role)
      res.json({
        message: result.message,
        token: result.token,
        data: result.data,
        role: result.role
      });
    } else {
      res.status(400).json({ message: result.message });
    }
  }

  // -------------------------------------------------------------------------

  async getUserInfo(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const userData = req.user;

      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
