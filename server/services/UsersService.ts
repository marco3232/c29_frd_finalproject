import { Knex } from "knex";
import jwtSimple from "jwt-simple";
import { comparePassword } from "../utils/hash";
import jwt from "../utils/jwt";

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
}