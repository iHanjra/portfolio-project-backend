const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const ShirtsController = require("./controllers/shirtsController");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/shirts", ShirtsController);

app.get("/", (req, res) => {
  res.send("Welcome to Humpty Dumb Tees App");
});

app.get("*", (req, res) => {
  res.send("Page not found");
});

module.exports = app;
