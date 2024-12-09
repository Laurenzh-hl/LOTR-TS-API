import app from "./app";
//const app = require("./app");
import db from "./config/db";
//const db = require("./config/db")

const port = 3000;

app.listen(port, () => {
  db.sync();
  console.log(`Listening at http://localhost:${port}`);
});
