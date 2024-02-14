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

    // ---------------------------------------------------------------

    async login(email: string, password: string) {
        const userInfoQuery = await this.knex("users").select("*").where("email", email).first();

        if (userInfoQuery) {
            const passwordHash = userInfoQuery.password;

            const compareResult = await comparePassword(password, passwordHash);

            if (compareResult) {
                const payload = {
                    id: userInfoQuery.id,
                    email: userInfoQuery.email,
                    name: userInfoQuery.firstName
                };

                const token = jwtSimple.encode(payload, jwt.jwtSecret);


                return { flag: true, message: "Login successful!", token: token };

            } else {
                return { flag: false, message: "Incorrect password" };
            }
        } else {
            return { flag: false, message: "User not found" };
        }
    }

    // -----------------------------------------------------------------------------------------------
    async register(email: string, hashed: string, mobile_phone: number, eng_surname: string, eng_given_name: string) {
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
                eng_surname: eng_surname,
                eng_given_name: eng_given_name
            });

            return { success: true, message: "User registered successfully" };
        } catch (error: any) {
            return { success: false, message: error.message };
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