import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "../auth/auth.validation";
import { TraineeController } from "./trainee.controller";

const router = express.Router();

router.put(
  "/:id",
  auth(ENUM_USER_ROLE.TRAINEE),
  validateRequest(AuthValidation.UpdateUserZodSchema),
  TraineeController.updateTrainee
);

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.TRAINEE),
  TraineeController.getTrainee
);

export const TraineeRoutes = router;
