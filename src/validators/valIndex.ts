import { body } from "express-validator";

class ModelValidator {
  checkCreateRace() {
    return [
      body("name").notEmpty().withMessage("The name value should not be empty"),
      body("name").isString().withMessage("The name value should be a string"),
      body("id").optional().isInt().withMessage("The id must be an integer"),
      body("dominions")
        .notEmpty()
        .withMessage("The dominions value should not be empty"),
      body("dominions")
        .isString()
        .withMessage("The dominions value should be a string"),
      body("languages")
        .notEmpty()
        .withMessage("The languages value should not be empty"),
      body("languages")
        .isString()
        .withMessage("The languages value should be a string"),
      body("lifespan")
        .notEmpty()
        .withMessage("The lifespan value should not be empty"),
      body("lifespan")
        .isString()
        .withMessage("The lifespan value should be a string"),
      body("height")
        .notEmpty()
        .withMessage("The height value should not be empty"),
      body("height")
        .isString()
        .withMessage("The height value should be a string"),
    ];
  }

  checkRacePatch() {
    return [
      body("name")
        .optional()
        .isString()
        .withMessage("The name value should be a string"),
      body("dominions")
        .optional()
        .isString()
        .withMessage("The dominions value should be a string"),
      body("languages")
        .optional()
        .isString()
        .withMessage("The languages value should be a string"),
      body("lifespan")
        .optional()
        .isString()
        .withMessage("The lifespan value should be a string"),
      body("height")
        .optional()
        .isString()
        .withMessage("The height value should be a string"),
    ];
  }

  checkCreateChar() {
    return [
      body("id").optional().isInt().withMessage("The id must be an integer"),
      body("name").notEmpty().withMessage("The name value should not be empty"),
      body("name").isString().withMessage("The name value should be a string"),
      body("origin")
        .notEmpty()
        .withMessage("The origin value should not be empty"),
      body("origin")
        .isString()
        .withMessage("The origin value should be a string"),
      body("fellowshipMember")
        .optional()
        .isBoolean()
        .withMessage("This value should be a boolean"),
      body("weapon")
        .notEmpty()
        .withMessage("The weapon value should not be empty"),
      body("weapon")
        .isString()
        .withMessage("The weapon value should be a string"),
    ];
  }

  checkCharPatch() {
    return [
      body("name")
        .optional()
        .isString()
        .withMessage("The name value should be a string"),
      body("origin")
        .optional()
        .isString()
        .withMessage("The origin value should be a string"),
      body("fellowshipMember")
        .optional()
        .isBoolean()
        .withMessage("The fellowshipMember value should be a boolean"),
      body("weapon")
        .optional()
        .isString()
        .withMessage("The weapon value should be a string"),
    ];
  }
}

export default new ModelValidator();
