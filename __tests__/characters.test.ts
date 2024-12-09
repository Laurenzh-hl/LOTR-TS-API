import request from "supertest";
import app from "../src/app";
import { Character } from "../src/Models/Models";
const characters = require("../seed/characters.json");
let charQuantity;
