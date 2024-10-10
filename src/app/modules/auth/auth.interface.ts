import { Gender_User, Role } from '../../../enums/user';
import { IBooking } from '../booking/booking.interface';
import { IClassSchedule } from '../classSchedule/classSchedule.interface';

export type ILoginUserResponse = {
  id: number;
  role: Role;
  accessToken: string;
};

export type IUser = {
  id: number;
  name: string;
  image: string;
  gender: Gender_User;
  email: string;
  password: string;
  role: Role;
  bookings?: IBooking[];
  classSchedules?: IClassSchedule[];
};
