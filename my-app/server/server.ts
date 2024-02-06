import cors from "cors";
import express from "express";
import Knex from "knex";
import { TodoController } from "./controllers/TodoController";
import { TodoService } from "./services/TodoService";

//-------------------------------------------------------------------------------------------

const app = express();
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const PORT = 8080;
// const PORT = 3000;
const todoService = new TodoService(knex);
const todoController = new TodoController(todoService);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get("/hi", (req, res) => res.send("hii,123,456"));
app.use("/todo", todoController.router);














//-------------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
