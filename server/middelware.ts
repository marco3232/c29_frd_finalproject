import { NextFunction, Request, Response } from "express";


declare module 'express-session' {
    interface SessionData {
        email: string;
        is_admin?: boolean;
    }
}


export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.email) {
        next();
    } else {
        res.status(401).json({ message: "Access denied. You are not logged in." });
    }
}

export function is_admin(req: Request, res: Response, next: NextFunction) {
    if (req.session.email) {
        let result = req.body.email
        console.log("result:", result)
        if (req.session.is_admin) {
            next();
        } else {
            res.status(401).json({ message: "access denied. you are not admin." });
        }
    } else {
        res.status(401).json({ message: "access denied. you are not logged in.å" })
    }
}

