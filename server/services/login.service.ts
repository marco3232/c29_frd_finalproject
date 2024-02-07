import { Knex } from "knex";
import jwtSimple from "jwt-simple";
import { comparePassword } from "../utils/hash";
import jwt from "../utils/jwt";

export class LoginService {

    public constructor (private knex: Knex) {}

    table(){
        return this.knex("users");
    }

    async login (username: string, password_input: string){

        let userInfoQuery = await this.table()
            .select("*")
            .where("email" );

            // console.log("march wanner know:", userInfoQuery)

        if (userInfoQuery.length > 0){

            let password_hash = userInfoQuery[0].password_hash;

            let compareResult = await comparePassword(password_input, password_hash)

            if (compareResult) {
                const payload = {
                    id: userInfoQuery[0].id,
                    username: userInfoQuery[0].username,
                };

                const token = jwtSimple.encode(payload, jwt.jwtSecret);

                return {flag: true, message: "success", token:token}
            } else{
                return {flag: false, message:"wrong password"}
            }
        } else{
            return  { flag: false, message: "no such username" };
        }
    }
}