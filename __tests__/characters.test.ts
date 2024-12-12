import request from "supertest";
import app from "../src/app";
import { Character } from "../src/Models/Models";
let charQuantity: number;

beforeAll(async function () {
  const characters = await Character.findAll();
  charQuantity = characters.length;
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
      if (char.name && char.origin && char.weapon) {
        return true;
      } else {
        return false;
      }
    });
    expect(areAllChars).toBe(true);
  });

  it("returns correct number of characters", async () => {
    const response = await request(app).get("/characters");
    expect(response.body.length).toEqual(charQuantity);
  });

  it("returns correct character data", async () => {
    const response = await request(app).get("/characters");
    expect(response.body).toContainEqual(
      expect.objectContaining({
        id: 1,
        name: "Frodo Baggins",
        origin: "The Shire",
        fellowshipMember: true,
        weapon: "Sting",
      })
    );
  });
});

describe("GET /characters/:id", () => {
  it("returns correct data", async () => {
    const response = await request(app).get("/characters/1");
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: "Frodo Baggins",
        origin: "The Shire",
        fellowshipMember: true,
        weapon: "Sting",
      })
    );
  });
});

describe("POST /characters", () => {
  it("returns new character added to array", async () => {
    const response = await request(app).post("/characters").send({
      name: "Treebeard",
      origin: "Fangorn Forest",
      fellowshipMember: false,
      weapon: "Branch arms",
    });
    expect(response.body).toHaveProperty("newCharacter");
    expect(response.body.newCharacter).toEqual(
      expect.objectContaining({
        name: "Treebeard",
        origin: "Fangorn Forest",
        fellowshipMember: false,
        weapon: "Branch arms",
      })
    );
  });

  it("returns an error if name isn't a string", async () => {
    const response = await request(app).post("/characters").send({
      name: 45,
      origin: "Fangorn Forest",
      fellowshipMember: false,
      weapon: "Branch arms",
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if origin isn't a string", async () => {
    const response = await request(app).post("/characters").send({
      name: "Treebeard",
      origin: 56,
      fellowshipMember: false,
      weapon: "Branch arms",
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if fellowshipMember isn't a boolean", async () => {
    const response = await request(app).post("/characters").send({
      name: "Treebeard",
      origin: "Fangorn Forest",
      fellowshipMember: "nope!",
      weapon: "Branch arms",
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if weapon isn't a string", async () => {
    const response = await request(app).post("/characters").send({
      name: "Treebeard",
      origin: "Fangorn Forest",
      fellowshipMember: false,
      weapon: true,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });
});

describe("PATCH /characters/:id", () => {
  it("should update first character in database", async () => {
    await request(app).patch("/characters/1").send({
      name: "Bongo Baggins",
    });
    const response = await request(app).get("/characters/1");
    expect(response.body.name).toEqual("Bongo Baggins");
  });

  it("returns an error if name isn't a string", async () => {
    const response = await request(app).patch("/characters/1").send({
      name: 52,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if origin isn't a string", async () => {
    const response = await request(app).patch("/characters/1").send({
      origin: 52,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if fellowshipMember isn't a boolean", async () => {
    const response = await request(app).patch("/characters/1").send({
      fellowshipMember: 52,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if weapon isn't a string", async () => {
    const response = await request(app).patch("/characters/1").send({
      weapon: 52,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });
});

describe("DELETE /characters/:id", () => {
  it("should delete entry by id", async () => {
    await request(app).delete("/characters/1");
    const allChars = await Character.findAll();
    expect(allChars.length).toEqual(charQuantity);
    expect(allChars[0].id).not.toEqual(1);
  });
});
