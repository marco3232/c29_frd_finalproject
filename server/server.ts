import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import Knex from "knex";
import { ItemController } from "./controllers/itemController";
import { ItemService } from "./services/itemService";
import { AuthService } from "./services/userService";
import AuthController from "./controllers/authController";
// -----------------------------------------------------------------------------------------------

const app = express();
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const PORT = 8080;

// --------------------- controller and service------------------------------

const itemService = new ItemService(knex);
const itemController = new ItemController(itemService);
const authService = new AuthService(knex);
const authController = new AuthController(authService);

// -----------------------------------------------------------------------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/auth", authController.router) // route to authController
app.use("/donate", itemController.router);


// -----------------------------------------------------------------------------------------------

app.get("/hi", (req, res) => {
  res.send("hi");
});






//-----------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
