import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import Knex from "knex";

// -----------------------------------------------------------------------------------------------

const app = express();
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const PORT = 8080;
// --------------------- controller and service------------------------------

import { ItemController } from "./controllers/ItemController";
import { ItemService } from "./services/Item.service";
import { AuthService } from "./services/UsersService";
import { AuthController } from "./controllers/UsersController";
import { LogisticController } from "./controllers/logisticsController";
import { LogisticService } from "./services/logisticsServices";

const itemService = new ItemService(knex);
const itemController = new ItemController(itemService);
const authService = new AuthService(knex);
const authController = new AuthController(authService);
const logisticService = new LogisticService(knex);
const logisticController = new LogisticController(logisticService);

// -----------------------------------------------------------------------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/hi", (req, res) => {
  res.send("hi");
});

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

app.post("/login", authController.router);
app.get("/register", authController.router);
// console.log("march wanner know:",authController)

// ----------------------這是分隔線----------------------------
app.use("/donate", itemController.router);
app.use("/",logisticController.router)

// -----------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
