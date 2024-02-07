import express, { Request, Response}from "express";
import { LoginService } from "../services/login.service";

export class LoginController {
    router = express.Router();
    public constructor(private loginService: LoginService){
        this.router.post("/login", this.login)
    }

    login = async (req: Request, res: Response) =>{
        let { email, password } = req.body;

        let result = await this.loginService.login(email, password);

        // console.log("March wanner know:", result)
        if(result.flag){
            res.json({ message: result.message, token: result.token});
        } else {
            res.status(400).json(result.message)
        }
    }
}