import express, { Request, Response } from "express";
import { hashedPassword } from "../utils/hash";
import { AuthService } from "../services/userService";


// -----------------------------------------------------------------------------------------------

export = class AuthController {
    static register(firstName: any, lastName: any, email: any, password: any, phoneNumber: any) {
        throw new Error("Method not implemented.");
    }
    router = express.Router();
    public constructor(private authService: AuthService) {
        this.router.post("/login", this.login)
        this.router.post("/register", this.register)
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

            let checkEmail = await this.authService.getUserEmail(req.body.email)
            if (checkEmail.rowCount > 0) {
                return res.status(400).json({ message: "Email exists" });
            }

            // const existingUser = await this.authService.getUserEmail(req.body.mobile_phone);
            // if (existingUser.rowCount > 0) {
            //     return res.status(400).json({ message: "Mobile phone already exists" });
            // }

            let hashed = await hashedPassword(req.body.password);

            await this.authService.register(
                req.body.email,
                hashed,
                req.body.mobile_phone
            );

            return res.json({ message: "Register success" });
        } catch (e: any) {
            return res.status(400).json({ message: e.message });
        }
    }

    // -----------------------------------------------------------------------------------------------

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

};

