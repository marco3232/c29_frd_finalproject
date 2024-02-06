import cors from "cors";
import express from "express";



const app = express();

app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
import Knex from "knex";

const knexConfig = require("./knexfile")
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const PORT = 7777;

app.get("/sexy", (req,res)=> res.send("You a so sexy"))


app.listen(PORT, ()=>{
  console.log(`App running at http://localhost:{PORT}`)
});