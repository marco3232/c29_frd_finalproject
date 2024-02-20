import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import jwt from "./jwt";
import express from "express";
//-------------------------------------------------------------------------------------------

const permit = new Bearer({
    query: "access_token"
});

interface User {
    id: number
    mobile_phone: number
    eng_given_name: string   
}

declare global {
    namespace Express {
        interface Request {
            user?: Omit<User, 'password'>
        }
    }
}

//-------------------------------------------------------------------------------------------

export async function isLoggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const token = permit.check(req);
        if (!token) {
            return res.status(401).json({ msg: "Permission Denied" });
        }

        const decoded: Omit<User, 'password'> = jwtSimple.decode(token, jwt.jwtSecret);
        req.user = decoded;

        // console.log("guard.ts check", req.user)

        return next();
    } catch (e) {
        return res.status(401).json({ msg: "Permission Denied" });
    }
}

//-------------------------------------------------------------------------------------------

export default {
    jwtSecret: "nmyJTwyxqlwGy2gcmeQJdQ0I4z9JWP2BojmNU8YEo8rjfuzgNZ",
    jwtSession: {
        session: false,
    },
};

//-------------------------------------------------------------------------------------------

