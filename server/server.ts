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

import { ItemService } from "./services/itemService";

import AuthController from "./controllers/authController";
import { AuthService } from "./services/authService";
import { UploadDonateItemsController } from "./controllers/uploadDonateItemsController";
import { UploadDonateItemsService } from "./services/uploadDonateItemsService";
// -------------------------------------------------------------------------------
import { LogisticController } from "./controllers/logisticController";
import { LogisticService } from "./services/logisticsService";

import { LogisticMixService } from "./services/logisticServicesMix";
import { LogisticMixController } from "./controllers/logisticControllerMix";
import { ItemController } from "./controllers/ItemController";
import { isLoggedIn } from "./utils/gurad";

const itemService = new ItemService(knex);
const itemController = new ItemController(itemService);
const authService = new AuthService(knex);
const authController = new AuthController(authService);

const uploadDonateItemsService = new UploadDonateItemsService(knex);
const uploadDonateItemsController = new UploadDonateItemsController(
  uploadDonateItemsService
);

const logisticService = new LogisticService(knex);
const logisticController = new LogisticController(logisticService);

const logisticMixService = new LogisticMixService(knex); // this is insert two database "logistic_items & logistic"
const logisticMixController = new LogisticMixController(logisticMixService); // this is insert two database "logistic_items & logistic"

// -----------------------------------------------------------------------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/auth", authController.router); // route to authController
app.use("/donate", itemController.router);

// -----------------------------------------------------------------------------------------------

app.get("/hi", isLoggedIn, (req, res) => {
  res.send(`Welcome, ${req.user?.eng_given_name}!`);

});

app.post("/login", authController.router);
app.get("/register", authController.router);

// ----------------------這是分隔線----------------------------
app.use("/donate", uploadDonateItemsController.router);
app.use("/", logisticMixController.router); // this is insert two database "logistic_items & logistic"
app.use("/", logisticController.router);

//-----------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
