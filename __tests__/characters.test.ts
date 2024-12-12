import request from "supertest";
import app from "../src/app";
import { Character } from "../src/Models/Models";
import { syncSeed } from "../seed/seed";

// interface CharInterface {
//   id: number;
//   name: string;
//   origin: string;
//   fellowshipMember: boolean;
//   weapon: string;
// }

beforeAll(async function () {
  const characters = await Character.findAll();
  let charQuantity = characters.length;
});

describe("GET /characters", () => {
  it("returns 200 status code", async () => {
    const response = await request(app).get("/characters");
    expect(response.statusCode).toBe(200);
  });

  it("returns an array of characters", async () => {
    const response = await request(app).get("/characters");
    const responseData = JSON.parse(response.text);
    let areAllChars = responseData.every(function (
      char: Character
    ): char is Character {
      const first = char.name && char.origin;
      const second = first && char.weapon;
      if (second) {
        return true;
      } else {
        return false;
      }
    });
    expect(areAllChars).toBe(true);
  });
});
