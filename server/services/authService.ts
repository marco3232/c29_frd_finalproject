import { Knex } from "knex";
import jwtSimple from "jwt-simple";
import { comparePassword } from "../utils/hash";
import jwt from "../utils/jwt";
import bcrypt from 'bcrypt'
// -----------------------------------------------------------------------------------------------

export class AuthService {
    public constructor(private knex: Knex) { }
    table() {
        return this.knex("users");
    }

    // ---------------------------------------------------------------

    async login(email: string, password: string) {
        const userInfoQuery = await this.knex("users").select("*").where("email", email).first();

        if (!userInfoQuery) {
            return { flag: false, message: "User not found" }
        }

        const passwordMatch = await bcrypt.compare(password, userInfoQuery.password)
        if (!passwordMatch) {
            return { flag: false, message: "Incorrect password" }
        }


        if (passwordMatch) {
            const payload = {
                id: userInfoQuery.id,
                email: userInfoQuery.email,
                name: userInfoQuery.eng_surname
            };

            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            return { flag: true, message: "Login successful!", token: token };
        } else {
            return { flag: false, message: "Incorrect password" }

        }

    }

    // -----------------------------------------------------------------------------------------------

    async register(eng_surname: string, eng_given_name: string, chi_surname: string, chi_given_name: string, email: string, mobile_phone: number, hashed: string,) {
        try {
            if (!email || !hashed || !mobile_phone) {
                throw new Error("Missing required fields");
            }

            const existingUser = await this.table().where("email", email).first();
            if (existingUser) {
                throw new Error("Email already exists");
            }

            const existingUserByPhone = await this.table().where("mobile_phone", mobile_phone).first();
            if (existingUserByPhone) {
                throw new Error("Phone number already exists");
            }

            if (String(mobile_phone).length != 8) {
                throw new Error("Phone number must be 8 digits")
            }


            const data = {
                eng_surname,
                eng_given_name,
                chi_surname,
                chi_given_name,
                email,
                mobile_phone,
                password: hashed,
            }
            console.log(data)
            await this.table().insert(data);
            return { success: true, message: "User registered successfully" };

        } catch (error: any) {
            console.error(error)
            throw new Error(error.message)
        }
    }

    // -----------------------------------------------------------------------------------------------

    async getUser(email: string): Promise<number> {
        try {
            const queryResult = await this.table()
                .where("email", email)
                .select("*");
            return queryResult.length;
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
        eng_surname: string,
        hashed: string,
        is_admin: boolean
    }): Promise<void>
}