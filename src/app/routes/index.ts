import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { ClassSchedule } from "../modules/classSchedule/classSchedule.route";
import { TraineeRoutes } from "../modules/trainee/trainee.route";
import { TrainerRoutes } from "../modules/trainer/trainer.route";
const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/trainer",
    route: TrainerRoutes,
  }, {
    path: '/trainee',
    route: TraineeRoutes
  },
  {
    path: "/schedule",
    route: ClassSchedule,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
