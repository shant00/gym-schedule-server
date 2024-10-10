import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.get(
    "/:id",
    auth(ENUM_USER_ROLE.TRAINEE),
    BookingController.traineesBookings)
router.put(
    "/:id",
    auth(ENUM_USER_ROLE.TRAINEE),
    BookingController.updateBooking
)
router.post(
    "/",
    auth(ENUM_USER_ROLE.TRAINEE),
    BookingController.createBooking)


export const BookingRoutes = router;
