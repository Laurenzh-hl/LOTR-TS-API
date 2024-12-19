import { Router, Request, Response, NextFunction } from "express";
import { Character, Race } from "../Models/Models";
import { validationResult } from "express-validator";
import ModelValidator from "../validators/valIndex";
const router = Router();

router.post(
  "/",
  ModelValidator.checkCreateRace(),
  async function (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const newRace = await Race.create(req.body);
        res.status(201).json({ newRace, msg: "Race successfully created!" });
      } catch (error) {
        res.status(500).json({ error: "Failed to add new race" });
      }
    }
  }
);

router.get("/", async function (req: Request, res: Response) {
  try {
    const races = await Race.findAll();
    res.status(200).json(races);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch races" });
  }
});

router.get("/:raceId", async function (req: Request, res: Response) {
  try {
    const race = await Race.findByPk(req.params.raceId);
    if (race) {
      res.status(200).json(race);
    } else {
      res.status(404).json({ error: "Race not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch race" });
  }
});

router.get("/:raceId/characters", async function (req: Request, res: Response) {
  try {
    const race = await Race.findByPk(req.params.raceId);
    if (!race) {
      res.status(404).json({ error: "Race not found" });
      return;
    }
    const characters = await race.getCharacters();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch characters" });
  }
});

router.post(
  "/:raceId/characters/:charId",
  async function (req: Request, res: Response) {
    try {
      const race = await Race.findByPk(req.params.raceId);
      if (!race) {
        res.status(404).json({ error: "Race not found" });
        return;
      }
      const character = await Character.findByPk(req.params.charId);
      if (!character) {
        res.status(404).json({ error: "Character not found" });
        return;
      }
      await race.addCharacter(character);
      res.status(201).json({ msg: "Character successfully added to race!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to set up association" });
    }
  }
);

router.patch(
  "/:raceId",
  ModelValidator.checkRacePatch(),
  async function (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        await Race.update(req.body, {
          where: { id: req.params.raceId },
        });
        const updatedRace = await Race.findByPk(req.params.raceId);
        if (updatedRace) {
          res.status(200).json(updatedRace);
        } else {
          res.status(404).json({ error: "Race not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to update Race" });
      }
    }
  }
);

router.delete("/:raceId", async function (req, res) {
  try {
    const deletedRace = await Race.destroy({
      where: { id: req.params.raceId },
    });
    res.status(200).json({ msg: "Race successfully removed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete race" });
  }
});

//module.exports = router;
export default router;
