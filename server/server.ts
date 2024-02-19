import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import Knex from "knex";

// ------Import routes and services------------------------------------------------------
import { AuthService } from "./services/authService";
import AuthController from "./controllers/authController";
import { ItemService } from "./services/itemService";
import { ItemController } from "./controllers/itemController";
import { UploadDonateItemsService } from "./services/uploadDonateItemsService";
import { UploadDonateItemsController } from "./controllers/uploadDonateItemsController";
import { LogisticService } from "./services/logisticsService";
import { LogisticController } from "./controllers/logisticController";
import { LogisticMixService } from "./services/logisticServicesMix";
import { LogisticMixController } from "./controllers/logisticControllerMix";
//-----------
import { isLoggedIn } from "./utils/gurad";
//-----------
const app = express();
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const PORT = 8080;
//-----------

// ------Initialize services------------------------------------------------------

const authService = new AuthService(knex);
const itemService = new ItemService(knex);
const uploadDonateItemsService = new UploadDonateItemsService(knex);
const logisticService = new LogisticService(knex);
const logisticMixService = new LogisticMixService(knex);


// ------Initialize controllers------------------------------------------------------

const authController = new AuthController(authService);
const itemController = new ItemController(itemService);
const uploadDonateItemsController = new UploadDonateItemsController(uploadDonateItemsService);
const logisticController = new LogisticController(logisticService);
const logisticMixController = new LogisticMixController(logisticMixService);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ------Auth routes------------------------------------------------------
app.use("/auth", authController.router);

// ------Donate routes------------------------------------------------------
app.use("/donate", isLoggedIn, itemController.router);
app.use("/donate", isLoggedIn, uploadDonateItemsController.router);


// ------Logistic routes------------------------------------------------------
app.use("/logistic", isLoggedIn, logisticController.router);
app.use("/logistic-mix", isLoggedIn, logisticMixController.router);

// ------Other routes------------------------------------------------------
// app.get("/hi", isLoggedIn, (req, res) => {
//   res.send(`Welcome, ${req.user?.eng_given_name}!`);
// });

app.post("/login", authController.router);
app.get("/register", authController.router);


// ------Port------------------------------------------------------

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
