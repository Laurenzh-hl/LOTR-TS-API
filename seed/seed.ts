import { Character, Race } from "../src/Models/Models";
const charData = require("./characters.json");
const raceData = require("./races.json");
import db from "../src/config/db";

const syncSeed = async () => {
  // drop the db
  await db.sync({ force: true });
  // add the data
  const characters = await Character.bulkCreate(charData);
  const races = await Race.bulkCreate(raceData);

  //associate some data
  await Promise.all([
    races[0].setCharacters([
      characters[0],
      characters[6],
      characters[7],
      characters[8],
      characters[13],
    ]),
  ]);

  console.log("database populated");
};

syncSeed();
