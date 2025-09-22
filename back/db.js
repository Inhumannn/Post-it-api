const mongoose = require("mongoose");

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const appName = process.env.DB_APPNAME;
const uri = `mongodb+srv://${user}:${password}@${cluster}/?retryWrites=true&w=majority&appName=${appName}`;

mongoose
  .connect(uri)
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB : ", err));

module.exports = mongoose.connection;
