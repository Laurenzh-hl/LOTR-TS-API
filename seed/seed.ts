import { Character, Race } from "../src/Models/Models";
const charData = require("./characters.json");
const raceData = require("./races.json");
import db from "../src/config/db";

export const syncSeed = async () => {
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
    races[1].setCharacters([
      characters[4],
      characters[5],
      characters[11],
      characters[12],
      characters[14],
      characters[15],
    ]),
    races[2].setCharacters([
      characters[1],
      characters[9],
      characters[10],
      characters[16],
      characters[19],
    ]),
    races[3].setCharacters([characters[2], characters[18]]),
    races[4].setCharacters([characters[3]]),
  ]);

  console.log("database populated");
};

syncSeed();
