import { Request, Response, NextFunction } from "express"
import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import jwt from "./jwt";


const permit = new Bearer({
    query: "access_token"
});

type UserType = {
    id: number;
    email: string;
    password: string;
};

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {

        const token = permit.check(req);

        if (!token) {
            throw Error();
        }

        const decoded: Omit<UserType, "password"> = jwtSimple.decode(
            token,
            jwt.jwtSecret
        );
        req.body.users_id = decoded.id
        next();
    } catch (error) {
        res.status(401).json({ msg: "Permission Denied" })
    }
}