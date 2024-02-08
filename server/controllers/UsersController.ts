import express, { Request, Response } from "express";
import { AuthService } from "../services/UsersService";
import { hashedPassword } from "../utils/hash";

export class AuthController {
    router = express.Router();
    public constructor(private authService: AuthService) {
        this.router.post("/login", this.login)
        this.router.get("./register", this.register)
    }

    login = async (req: Request, res: Response) => {
        let { email, password } = req.body;

        let result = await this.authService.login(email, password);

        console.log("March wanner know:", result)
        if (result.flag) {
            res.json({ message: result.message, token: result.token });
        } else {
            res.status(400).json({ message: result.message })
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            if (!req.body.email) {
                return res.status(400).json({ message: "Email cannot be empty" });
            } else if (!req.body.password) {
                return res.status(400).json({ message: "Password cannot be empty" });
            } else if (!req.body.mobile_phone) {
                return res.status(400).json({ message: "Mobile cannot be empty" })
            }

            let queryResult = await this.authService.getUserEmail(req.body.email)
            console.log("result:", queryResult.rows);
            if (queryResult.rowCount > 0) {
                return res.status(400).json({ message: "Account exists" });
            }

            let hashed = await hashedPassword(req.body.password);

            await this.authService.register(
                req.body.email,
                hashed,
                req.body.mobile_phone
            );

            return res.json({ message: "register success" });
        } catch (e: any) {
            return res.status(400).json({ message: e.message });
        }
    }
}