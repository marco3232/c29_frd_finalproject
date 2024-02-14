import express, { Request, Response } from "express";
import { comparePassword, hashedPassword } from "../utils/hash";
import { AuthService } from "../services/authService";

//-------------------------------------------------------------------------------------------

export default class AuthController {
    router = express.Router();

    constructor(private authService: AuthService) {
        this.router.post("/login", this.login.bind(this));
        this.router.post("/register", this.register.bind(this));
    }

    async register(req: Request, res: Response) {
        try {
            if (!req.body.email || !req.body.password || !req.body.mobile_phone) {
                return res.status(400).json({ message: "Email, password, and mobile phone cannot be empty" });
            }

            let checkEmail = await this.authService.getUserEmail(req.body.email);
            if (checkEmail.length > 0) {
                return res.status(400).json({ message: "Email already exists" });
            }

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

    // -------------------------------------------------------------------------

    async login(req: Request, res: Response) {
        let { email, password } = req.body;

        let result = await this.authService.login(email, password);

        if (result.flag) {
            res.json({ message: result.message, token: result.token });
            // window.location.assign("/")
            // window.location.href = "/";


        } else {
            res.status(400).json({ message: result.message })
        }
    }
}
