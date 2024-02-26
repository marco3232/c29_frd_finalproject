import { Knex } from "knex";
import jwtSimple from "jwt-simple";
import jwt from "../utils/jwt";
import bcrypt from "bcrypt";
// -----------------------------------------------------------------------------------------------

export class AuthService {
  public constructor(private knex: Knex) { }
  table() {
    return this.knex("users");
  }

  // ---------------------------------------------------------------

  // ---------------------------------------------------------------
  async login(email: string, password: string, role: string) {
    const userInfoQuery = await this.knex("users").select("*").where("email", email).first();

    if (userInfoQuery && userInfoQuery.password) {
      const comparePassword = await bcrypt.compare(password, userInfoQuery.password);

      if (comparePassword) {
        const payload = {
          id: userInfoQuery.id,
          email: userInfoQuery.email,
          data: userInfoQuery.eng_given_name,
          role: userInfoQuery.role,
        };

        const token = jwtSimple.encode(payload, jwt.jwtSecret);
        return { flag: true, data: userInfoQuery.eng_given_name, message: "Login successful!", token: token, role: userInfoQuery.role };
      } else {
        return { flag: false, message: "Sorry, Incorrect password" };
      }
    } else {
      return { flag: false, message: "Sorry, User not found" };
    }
  }


  // -----------------------------------------------------------------------------------------------

  async register(
    eng_surname: string,
    eng_given_name: string,
    chi_surname: string,
    chi_given_name: string,
    email: string,
    mobile_phone: number,
    hashed: string
  ) {
    try {
      if (!email || !hashed || !mobile_phone) {
        throw new Error("Sorry,Missing required fields");
      }

      const existingUser = await this.table().where("email", email).first();
      if (existingUser) {
        throw new Error("Sorry, Email already exists");
      }

      const existingUserByPhone = await this.table()
        .where("mobile_phone", mobile_phone)
        .first();
      if (existingUserByPhone) {
        throw new Error("Sorry, Phone number already exists");
      }

      if (String(mobile_phone).length != 8) {
        throw new Error("Sorry, Phone number must be 8 digits");
      }

      const data = {
        eng_surname,
        eng_given_name,
        chi_surname,
        chi_given_name,
        email,
        mobile_phone,
        password: hashed,
      };
      console.log(data);
      await this.table().insert(data);
      return { success: true, message: "User registered successfully" };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  // -----------------------------------------------------------------------------------------------

  async getUser(email: string): Promise<number> {
    try {
      const queryResult = await this.table().where("email", email).select("*");
      return queryResult.length;
    } catch (error: any) {
      throw new Error("Error retrieving user email: " + error.message);
    }
  }

  // -----------------------------------------------------------------------------------------------

  async getUserIdByEmail(email: string): Promise<number | null> {
    try {
      const user = await this.knex("users").select("id").where("email", email).first();
      return user ? user.id : null;
    } catch (error) {
      console.error("Error retrieving user ID:", error);
      return null;
    }
  }
}

// -----------------------------------------------------------------------------------------------

export interface UserService {
  loginUser(output: {
    username: string;
    password: string;
  }): Promise<{ username: string }>;
  getUserByEmail(email: string): Promise<any>;
  saveUser(output: {
    email: string;
    eng_surname: string;
    hashed: string;
    role: string;
  }): Promise<void>;
}
