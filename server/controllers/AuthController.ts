import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { hashPassword } from "../utils/hash";


export class AuthController {
    constructor(private userService: UserService) { }

    register = async (req: Request, res: Response) => {
        try {
            if (!req.body.email) {
                return res.status(400).json({ message: "Email cannot be empty" });
            } else if (!req.body.password) {
                return res.status(400).json({ message: "Password cannot be empty" });
            } else if (!req.body.username) {
                return res.status(400).json({ message: "Username cannot be empty" });
            }

            let queryResult = await this.userService.getUserByEmail(req.body.email)
            console.log("result:", queryResult.rows);
            if (queryResult.rowCount > 0) {
                return res.status(400).json({ message: "Account exists" });
            }

            let hashed = await hashPassword(req.body.password);
            console.log({
                email: req.body.email,
                password: hashed,
            })
            await this.userService.saveUser({
                email: req.body.email,
                hashed: hashed,
            })

            res.json({ message: "register success" });
        } catch (e: any) {
            return res.status(400).json({ message: e.message });

        }
    }
}