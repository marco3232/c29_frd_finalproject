import cors from "cors";
import express from "express";



const PORT = 7777;

const app = express();

app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
// import Knex from "knex";
// import { AuthService } from "./services/AuthService";
// import { AuthController } from "./controllers/AuthController";

// const knexConfig = require("./knexfile")
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
// console.log("March wanner know:",knex)

// const authService = new AuthService(knex)
// const authController = new AuthController(authService);

app.get("/sexy", (req,res)=> {res.send("You a so sexy")})

// app.use("/auth", authController.router);


app.listen(PORT, ()=>{
  console.log(`App running at http://localhost:${PORT}`);
});

