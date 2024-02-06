import express from "express";
import expressSession from "express-session";


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(
    expressSession({
      secret: "gyukj%^&*(*UYTGYHUJYT&*YHIUGYGYI",
      resave: true,
      saveUninitialized: true,
    })
  );