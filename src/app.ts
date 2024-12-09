// const express = require("express");
import express from "express";
const app = express();
// const router = require("./routes/characters");
import characters from "./routes/characters";
import races from "./routes/races";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/characters", characters);
app.use("/races", races);

export default app;
//module.exports = app;
