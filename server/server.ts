import cors from "cors";
import express from "express";
import Knex from "knex";
import bodyParser from "body-parser";
import { AuthService } from "./services/UsersService";
import { AuthController,  } from "./controllers/UsersController";

// -----------------------------------------------------------------------------------------------

const app = express();
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const PORT = 3000;

const authService = new AuthService(knex);
const authController = new AuthController (authService);

// -----------------------------------------------------------------------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/Register', (req, res) => {
  res.send("hi")
})

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
app.post("/login", authController.router)

console.log("march wanner know:",authController)


// -----------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});

