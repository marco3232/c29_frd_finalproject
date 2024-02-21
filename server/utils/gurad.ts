import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import jwt from "./jwt";
import express from "express";
import { request } from "http";
//-------------------------------------------------------------------------------------------

const permit = new Bearer({
    query: "access_token",
});



interface User {
    id: number;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: Omit<User, "password">;
        }
    }
}

//-------------------------------------------------------------------------------------------

export async function isLoggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
<<<<<<< HEAD
  try {
    const token = permit.check(req);
    if (!token) {
      return res.status(401).json({ msg: "Permission Denied x 1" });
    }
=======
    try {
        const token = permit.check(req);
        if (!token) {
            return res.status(401).json({ msg: "Permission Denied" });
        }
>>>>>>> 73e956b850ff543be87f649742616c7e243275ce

        const decoded: Omit<User, "password"> = jwtSimple.decode(
            token,
            jwt.jwtSecret
        );
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }
        console.log("guard.ts check", req.user);
        return next();
    } catch (e) {
        return res.status(401).json({ msg: "Permission Denied" });
    }
    // console.log("guard.ts check", req.user);
    return next();
<<<<<<< HEAD
  } catch (e) {
    return res.status(401).json({ msg: "Permission Denied x 1.5" });
  }
=======
>>>>>>> 73e956b850ff543be87f649742616c7e243275ce
}



export async function isAdminLoggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const token = permit.check(req);
        if (!token) {
            return res.status(401).json({ msg: "Permission Denied x 2" });
        }

        const decoded: Omit<User, 'password'> = jwtSimple.decode(token, jwt.jwtSecret);
        req.user = decoded;

        console.log("guard.ts check", req.user)

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