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
const itemService = new ItemService(knex);
const itemController = new ItemController(itemService);

// -----------------------------------------------------------------------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/hi", (req, res) => {
  res.send("hi");
});

app.post("/Register", async (req, res) => {
})
// ----------------------這是分隔線----------------------------
app.use("/donate", itemController.router);

// -----------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
