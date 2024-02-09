import { Knex } from "knex";
import jwtSimple from "jwt-simple";
import { comparePassword } from "../utils/hash";
import jwt from "../utils/jwt";

// -----------------------------------------------------------------------------------------------

export class AuthService {

    public constructor(private knex: Knex) { }

    table() {
        return this.knex("users");
    }

    async login(email: string, password_input: string) {

        let userInfoQuery = await this.table()
            .select("*")
            .where("email", email)
            .first()

        if (userInfoQuery) {

            let password = userInfoQuery.password;

            let compareResult = await comparePassword(password_input, password)

            if (compareResult) {
                const payload = {
                    id: userInfoQuery.id,
                    email: userInfoQuery.email,
                };

                const token = jwtSimple.encode(payload, jwt.jwtSecret);

                return { flag: true, message: "success", token: token }
            } else {
                return { flag: false, message: "wrong password" }
            }
        } else {
            return { flag: false, message: "no such email" };
        }
    }


    // -----------------------------------------------------------------------------------------------

    async getUserEmail(email: string): Promise<any> {
        try {
            const queryResult = await this.table()
                .where("email", email)
                .select("*");
            return queryResult;
        } catch (error: any) {
            throw new Error("Error retrieving user email: " + error.message);
        }
    }



    // -----------------------------------------------------------------------------------------------
    async register(email: string, hashed: string, mobile_phone: number) {
        try {
            if (!email || !hashed || !mobile_phone) {
                throw new Error("Missing required fields");
            }

            const existingUser = await this.table().where("email", email).first();
            if (existingUser) {
                throw new Error("Email already exists");
            }

            await this.table().insert({
                email: email,
                password: hashed,
                mobile_phone: mobile_phone,
            });

            return { success: true, message: "User registered successfully" };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }


}


// -----------------------------------------------------------------------------------------------

export interface UserService {
    loginUser(output: { username: string; password: string }): Promise<{ username: string }>
    getUserByEmail(email: string): Promise<any>
    saveUser(output: {
        email: string,
        username: string,
        hashed: string,
        is_admin: boolean
    }): Promise<void>
}