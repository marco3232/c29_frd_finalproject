import express,{ Request,Response} from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
    router = express.Router();
    public constructor(private authService: AuthService){
        this.router.post("/login",this.login);
    }

    login = async (req: Request, res: Response) =>{
        let {email, password} = req.body;

        let result = await this.authService.login(email, password)

        if (result.flag){
            res.json({ message: result.message, token: result.token})
        } else {
            res.status(400).json(result.message)
        }
    }
}