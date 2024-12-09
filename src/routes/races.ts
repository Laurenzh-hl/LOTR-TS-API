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
      res.json({ errors: errors.array() });
    } else {
      try {
        const newRace = await Race.create(req.body);
        res.json({ newRace, msg: "Race successfully created!" });
      } catch (error) {
        res.json({ error: "Failed to add new race" });
      }
    }
  }
);

router.get("/", async function (req: Request, res: Response) {
  try {
    const races = await Race.findAll();
    res.json(races);
  } catch (error) {
    res.json({ error: "Failed to fetch races" });
  }
});

router.get("/:id", async function (req: Request, res: Response) {
  try {
    const race = await Race.findByPk(req.params.id);
    if (race) {
      res.json(race);
    } else {
      res.status(404).json({ error: "Race not found" });
    }
  } catch (error) {
    res.json({ error: "Failed to fetch race" });
  }
});

router.patch(
  "/:id",
  ModelValidator.checkRacePatch(),
  async function (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      try {
        await Race.update(req.body, {
          where: { id: req.params.id },
        });
        const updatedRace = await Race.findByPk(req.params.id);
        if (updatedRace) {
          res.status(200).json(updatedRace);
        } else {
          res.status(404).json({ error: "Race not found" });
        }
      } catch (error) {
        res.status(400).json({ error: "Failed to update Race" });
      }
    }
  }
);

router.delete("/:id", async function (req, res) {
  try {
    const deletedRace = await Race.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedRace);
  } catch (error) {
    res.json({ error: "Failed to delete race" });
  }
});

//module.exports = router;
export default router;
