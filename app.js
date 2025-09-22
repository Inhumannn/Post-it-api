require("./db");
require("dotenv").config;

const postItRoutes = require("./routes/postitRoutes");
const express = require("express");
const app = express();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

app.use(express.json());

// app.use("/api/v1/postIt", postItRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenue sur notre API RESTful !");
});

app.listen(port, () => {
  console.log(`Connecté sur htpp://${host}:${port}`);
});
