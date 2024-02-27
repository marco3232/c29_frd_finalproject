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
import { CheckInService } from "./services/checkInService";
import { CheckInController } from "./controllers/checkInController";
import { CheckOutService } from "./services/checkOutService"
import { CheckOutController } from "./controllers/checkOutController";
//-----------

import AdminController from "./controllers/adminController";
import { AdminService } from "./services/adminService";
import { isAdminLoggedIn, isLoggedIn } from "./utils/gurad";
import { RentController } from "./controllers/rentController";
import {  rentItemService } from "./services/rentService";

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
const checkInService = new CheckInService(knex)
const rentService = new rentItemService(knex)
const checkOutService = new CheckOutService(knex)

// ------Initialize controllers------------------------------------------------------
const adminController = new AdminController(adminService);
const authController = new AuthController(authService);
const itemController = new ItemController(itemService);
const uploadDonateItemsController = new UploadDonateItemsController(uploadDonateItemsService);
const logisticController = new LogisticController(logisticService);
const logisticMixController = new LogisticMixController(logisticMixService);
const checkInController = new CheckInController(checkInService);
const checkOutController = new CheckOutController(checkOutService, checkInService)
const rentController = new RentController(rentService)



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ------Admin routes --
app.use("/admin", isAdminLoggedIn, adminController.router)
app.use("/logistics",isAdminLoggedIn,adminController.router)
// ------Auth routes------------------------------------------------------
app.use("/auth", authController.router);

// ------Donate routes------------------------------------------------------
app.use("/donate", isLoggedIn, itemController.router);
app.use("/donate", isLoggedIn, uploadDonateItemsController.router);
app.use("/rent", isLoggedIn, rentController.router)

// ------Logistic routes------------------------------------------------------
app.use("/", isLoggedIn, logisticController.router);
app.use("/", isLoggedIn, logisticMixController.router);

// ------CheckIn & CheckOut routes------------------------------------------------------
app.use("/", isLoggedIn, checkInController.router);
app.use("/", isLoggedIn, checkOutController.router);


// ------Other routes------------------------------------------------------
// app.get("/hi", isLoggedIn, (req, res) => {
//   res.send(`Welcome, ${req.user?.eng_given_name}!`);
// });

app.post("/login", authController.router);
app.post("/donate", (req, res) => {
  const donationData = req.body
  res.status(200).json({ message: "申請已提交" })
})
app.put("/approveDonation/:donationId", (req, res) => {
  const donationId = req.params.donationId
  const { approved } = req.body
  if (approved) {
    res.status(200).json({ message: "已成功批准" })
  } else {
    res.status(200).json({ message: "拒絕申請" })
  }
})




app.get("/register", authController.router);



// ------Port------------------------------------------------------

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
