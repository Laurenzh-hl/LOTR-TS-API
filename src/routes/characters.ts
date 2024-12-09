import { Router, Request, Response } from "express";
import { Character, Race } from "../Models/Models";
import { validationResult } from "express-validator";
import ModelValidator from "../validators/valIndex";
const router = Router();

router.post(
  "/",
  ModelValidator.checkCreateChar(),
  async function (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      try {
        const newCharacter = await Character.create(req.body);
        res.json({ newCharacter, msg: "Character successfully created!" });
      } catch (error) {
        res.json({ error: "Failed to add new character" });
      }
    }
  }
);

router.get("/", async function (req: Request, res: Response) {
  try {
    const characters = await Character.findAll();
    res.json(characters);
  } catch (error) {
    res.json({ error: "Failed to fetch characters" });
  }
});

router.get("/:id", async function (req: Request, res: Response) {
  try {
    const character = await Character.findByPk(req.params.id);
    if (character) {
      res.json(character);
    } else {
      res.status(404).json({ error: "Character not found" });
    }
  } catch (error) {
    res.json({ error: "Failed to fetch character" });
  }
});

router.patch(
  "/:id",
  ModelValidator.checkCharPatch(),
  async function (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      try {
        await Character.update(req.body, {
          where: { id: req.params.id },
        });
        const updatedChar = await Character.findByPk(req.params.id);
        if (updatedChar) {
          res.status(200).json(updatedChar);
        } else {
          res.status(404).json({ error: "Character not found" });
        }
      } catch (error) {
        res.status(400).json({ error: "Failed to update character" });
      }
    }
  }
);

router.delete("/:id", async function (req, res) {
  try {
    const deletedChar = await Character.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedChar);
  } catch (error) {
    res.json({ error: "Failed to delete character" });
  }
});

//module.exports = router;
export default router;
