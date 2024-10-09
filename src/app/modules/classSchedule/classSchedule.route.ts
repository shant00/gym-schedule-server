import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { classScheduleController } from "./classSchedule.controller";

const router = express.Router();

router.get(
  "/all",
  auth(ENUM_USER_ROLE.TRAINEE),
  classScheduleController.getAllSchedules
);

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.TRAINEE),
  classScheduleController.deleteSchedule
);

router.put(
  "/:id",
  auth(ENUM_USER_ROLE.TRAINEE),
  classScheduleController.updateSchedule
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.TRAINEE),
  classScheduleController.deleteSchedule
);

router.get(
  "/",
  auth(ENUM_USER_ROLE.TRAINEE),
  classScheduleController.getOneDaySchedule
);

router.post(
  "/",
  auth(ENUM_USER_ROLE.TRAINEE),
  classScheduleController.createSchedule
);

export const TrainerRoutes = router;
