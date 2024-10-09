import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "../auth/auth.validation";
import { TraineeController } from "./trainee.controller";

const router = express.Router();

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.TRAINEE),
  TraineeController.updateTrainee
);

router.put(
  "/:id",
  auth(ENUM_USER_ROLE.TRAINEE),
  validateRequest(AuthValidation.RegistrationZodSchema),
  TraineeController.getTrainee
);

export const TrainerRoutes = router;
