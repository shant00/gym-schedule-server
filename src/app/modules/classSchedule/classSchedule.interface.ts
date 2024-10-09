import { IUser } from "../auth/auth.interface";
import { IBooking } from "../booking/booking.interface";

export type IClassSchedule = {
  id: number;
  startTime: Date;
  endTime: Date;
  trainer?: IUser;
  trainerId: number;
  bookings?: IBooking[];
};
