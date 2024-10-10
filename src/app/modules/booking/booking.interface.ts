import { IUser } from '../auth/auth.interface';
import { IClassSchedule } from '../classSchedule/classSchedule.interface';

export type IBooking = {
  id: number;
  trainee?: IUser;
  traineeId?: number;
  classSchedule?: IClassSchedule;
  classId?: number;
};
