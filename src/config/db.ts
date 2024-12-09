import { Sequelize } from "sequelize";
// const { Sequelize } = require("sequelize");
import path from "path";
// const path = require("path");

const db = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
  logging: false,
});

export default db;
//module.exports = db;
