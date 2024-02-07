import cors from "cors";
import express from "express";
import Knex from "knex";
import bodyParser from "body-parser";
import { LoginService } from "./services/login.service";

// -----------------------------------------------------------------------------------------------

const app = express();
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const PORT = 8080;

// -----------------------------------------------------------------------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    await knex("users").insert({ email, password });
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

const loginService =new LoginService(knex)

console.log("march wanner know:",loginService)


// -----------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});

