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
  try {
    const token = permit.check(req);
    if (!token) {
      return res.status(401).json({ msg: "Permission Denied" });
    }

    const decoded: Omit<User, "password"> = jwtSimple.decode(
      token,
      jwt.jwtSecret
    );
    req.user ={
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
    }
    console.log("guard.ts check", req.user);
    return next();
  } catch (e) {
    return res.status(401).json({ msg: "Permission Denied" });
  }
}


export async function isAdminLoggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const token = permit.check(req);
      if (!token) {
        return res.status(401).json({ msg: "Permission Denied" });
      }
  
      const decoded: Omit<User, "password"> = jwtSimple.decode(
        token,
        jwt.jwtSecret
      );
      if (decoded.role !== 'admin') {
        return res.status(401).json({ msg: "Please login in Admin role" });
      }
      req.user ={
          id: decoded.id,
          email: decoded.email,
          role: decoded.role
      }
      console.log("guard.ts check", req.user);
      return next();
    } catch (e) {
      return res.status(401).json({ msg: "Permission Denied" });
    }
  }


// export async function updateIsAdmin(
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {

//     const result = await 
    
//     // if (result){
        
//     // }
//     console.log("answer:", result)
//     // if ( role){
//     //     if (role === "admin"){

//     //         res.status(200).json({ massage: "Admin login success" })
//     //     }
//     // }else{
//     //     res.status(400).json({
//     //         message:"Role is not admin"
//     //     })
//     // }
//     return 
//   } catch (e) {
//     return res.status(400).json({ msg: "Role or Id not present" });
//   }
// }
//-------------------------------------------------------------------------------------------
export default {
    jwtSecret: "nmyJTwyxqlwGy2gcmeQJdQ0I4z9JWP2BojmNU8YEo8rjfuzgNZ",
    jwtSession: {
        session: false,
    },
};
//-------------------------------------------------------------------------------------------
