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

import AdminController from "./controllers/adminController";
import { AdminService } from "./services/adminService";
import { isLoggedIn } from "./utils/gurad";
// import { updateIsAdmin } from "./utils/gurad"
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
const adminService = new AdminService(knex)


// ------Initialize controllers------------------------------------------------------
const adminController = new AdminController(adminService);

const authController = new AuthController(authService);
const itemController = new ItemController(itemService);
const uploadDonateItemsController = new UploadDonateItemsController(uploadDonateItemsService);
const logisticController = new LogisticController(logisticService);
const logisticMixController = new LogisticMixController(logisticMixService);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

// ------Admin routes --
<<<<<<< HEAD
app.use("/admin", isAdminLoggedIn, adminController.router)
app.use("/logistics",isAdminLoggedIn,adminController.router)
=======
// app.use("/admin", isAdminLoggedIn, adminController.router)
>>>>>>> 73e956b850ff543be87f649742616c7e243275ce
// ------Auth routes------------------------------------------------------
app.use("/auth", authController.router);

// ------Donate routes------------------------------------------------------
app.use("/donate", isLoggedIn, itemController.router);
app.use("/donate", isLoggedIn, uploadDonateItemsController.router);


// ------Logistic routes------------------------------------------------------
app.use("/", isLoggedIn, logisticController.router);
app.use("/", isLoggedIn, logisticMixController.router);

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
