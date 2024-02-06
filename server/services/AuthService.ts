import { Knex } from "knex";
import { comparePassword } from "../utils/hash";
import jwtSimple from "jwt-simple";
import jwt from "../utils/jwt";

export class AuthService {
    public constructor (private knex: Knex){}

    table(){
        return this.knex("users");
    }

    async login(email: string, password_input: string){

        let userInfoQuery = await this.table()
            .select("*")
            .where("users",email)

        if (userInfoQuery.length > 0){
            let password = userInfoQuery[0].password;

            let compareResult = await comparePassword(password_input,password);

            if (compareResult){
                console.log("success");

                const payload = {
                    id: userInfoQuery[0].id,
                    email: userInfoQuery[0].email
                };

                const token = jwtSimple.encode(payload, jwt.jwtSecret)

                return { flag: true, message:"success", token:token}
            }  else {
                return { flag: false, message: "wrong password"}
            }
        } else {
            return {flag: false, message:' no such username'}
        }
    }
}