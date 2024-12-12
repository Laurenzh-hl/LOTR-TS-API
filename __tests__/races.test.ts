import request from "supertest";
import app from "../src/app";
import { Race } from "../src/Models/Models";
let raceQuantity: number;

beforeAll(async function () {
  const races = await Race.findAll();
  raceQuantity = races.length;
});

describe("GET /races", () => {
  it("returns 200 status code", async () => {
    const response = await request(app).get("/races");
    expect(response.statusCode).toBe(200);
  });

  it("returns an array of races", async () => {
    const response = await request(app).get("/races");
    const responseData = JSON.parse(response.text);
    let areAllRaces = responseData.every(function (race: Race): race is Race {
      if (
        race.name &&
        race.dominions &&
        race.languages &&
        race.lifespan &&
        race.height
      ) {
        return true;
      } else {
        return false;
      }
    });
    expect(areAllRaces).toBe(true);
  });

  it("returns correct number of races", async () => {
    const response = await request(app).get("/races");
    expect(response.body.length).toEqual(raceQuantity);
  });

  it("returns correct Race data", async () => {
    const response = await request(app).get("/races");
    expect(response.body).toContainEqual(
      expect.objectContaining({
        id: 1,
        name: "Hobbits",
        dominions: "The Shire, Buckland, Bree",
        languages: "Hobbit-speech, Westron",
        lifespan: "Generally past one-hundred years",
        height: "60-120 cm",
      })
    );
  });
});

describe("GET /races/:id", () => {
  it("returns correct data", async () => {
    const response = await request(app).get("/races/1");
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: "Hobbits",
        dominions: "The Shire, Buckland, Bree",
        languages: "Hobbit-speech, Westron",
        lifespan: "Generally past one-hundred years",
        height: "60-120 cm",
      })
    );
  });
});

describe("POST /races", () => {
  it("returns new Race added to array", async () => {
    const response = await request(app).post("/races").send({
      name: "Wargs",
      dominions: "Misty Mountains, Isengard, Mount Gundabad, Mordor",
      languages: "Wolf-language, possibly Westron or Black Speech",
      lifespan: "10-20 years",
      height: "120-150 cm",
    });
    expect(response.body).toHaveProperty("newRace");
    expect(response.body.newRace).toEqual(
      expect.objectContaining({
        name: "Wargs",
        dominions: "Misty Mountains, Isengard, Mount Gundabad, Mordor",
        languages: "Wolf-language, possibly Westron or Black Speech",
        lifespan: "10-20 years",
        height: "120-150 cm",
      })
    );
  });

  it("returns an error if name isn't a string", async () => {
    const response = await request(app).post("/races").send({
      name: false,
      dominions: "Misty Mountains, Isengard, Mount Gundabad, Mordor",
      languages: "Wolf-language, possibly Westron or Black Speech",
      lifespan: "10-20 years",
      height: "120-150 cm",
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if dominions isn't a string", async () => {
    const response = await request(app).post("/races").send({
      name: "Wargs",
      dominions: 4,
      languages: "Wolf-language, possibly Westron or Black Speech",
      lifespan: "10-20 years",
      height: "120-150 cm",
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if languages isn't a string", async () => {
    const response = await request(app).post("/races").send({
      name: "Wargs",
      dominions: "Misty Mountains, Isengard, Mount Gundabad, Mordor",
      languages: 3,
      lifespan: "10-20 years",
      height: "120-150 cm",
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if lifespan isn't a string", async () => {
    const response = await request(app).post("/races").send({
      name: "Wargs",
      dominions: "Misty Mountains, Isengard, Mount Gundabad, Mordor",
      languages: "Wolf-language, possibly Westron or Black Speech",
      lifespan: true,
      height: "120-150 cm",
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if height isn't a string", async () => {
    const response = await request(app).post("/races").send({
      name: "Wargs",
      dominions: "Misty Mountains, Isengard, Mount Gundabad, Mordor",
      languages: "Wolf-language, possibly Westron or Black Speech",
      lifespan: true,
      height: 120,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });
});

describe("PATCH /races/:id", () => {
  it("should update first Race in database", async () => {
    await request(app).patch("/races/1").send({
      name: "Harfoots",
    });
    const response = await request(app).get("/races/1");
    expect(response.body.name).toEqual("Harfoots");
  });

  it("returns an error if name isn't a string", async () => {
    const response = await request(app).patch("/races/1").send({
      name: 52,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if dominions isn't a string", async () => {
    const response = await request(app).patch("/races/1").send({
      dominions: 52,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if languages isn't a boolean", async () => {
    const response = await request(app).patch("/races/1").send({
      languages: 52,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if lifespan isn't a string", async () => {
    const response = await request(app).patch("/races/1").send({
      lifespan: 52,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("returns an error if height isn't a string", async () => {
    const response = await request(app).patch("/races/1").send({
      height: 52,
    });
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });
});

describe("DELETE /races/:id", () => {
  it("should delete entry by id", async () => {
    await request(app).delete("/races/1");
    const allraces = await Race.findAll();
    expect(allraces.length).toEqual(raceQuantity);
    expect(allraces[0].id).not.toEqual(1);
  });
});
