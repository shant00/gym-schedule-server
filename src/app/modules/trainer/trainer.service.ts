import { PrismaClient } from '@prisma/client';
import { ENUM_USER_ROLE } from "../../../enums/user";
import { makeHashPassword } from '../../../shared/hashPassword';
import { IUser } from "../auth/auth.interface";
import { classScheduleService } from '../classSchedule/classSchedule.service';


const prisma = new PrismaClient();

const registerTrainer = async (data: IUser) => {
  const hashedPassword = await makeHashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      image: data.image,
      gender: data.gender,
      email: data.email,
      password: hashedPassword,
      role: ENUM_USER_ROLE.TRAINER,
    },
  });

  return user;
};

const updateTrainer = async (id: number, data: IUser) => {
  const hashedPassword = await makeHashPassword(data.password);
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      image: data.image,
      gender: data.gender,
      email: data.email,
      password: hashedPassword,
      role: ENUM_USER_ROLE.TRAINER,
    },
  })
  return user;
}

const getTrainer = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}

const deleteTrainer = async (id: number) => {
  const user = await prisma.user.delete({ where: { id } });
  return user;
}

const getAllTrainers = async () => {
  const users = await prisma.user.findMany({ where: { role: ENUM_USER_ROLE.TRAINER } });
  return users;
}

const getOneDayScheduleByTrainer = async (trainerId: number) => {
  const allSchedule = await classScheduleService.getOneDaySchedule();
  const schedules = allSchedule.filter((schedule) => schedule.trainerId === trainerId);
  return schedules;
}
export const TrainerService = {
  registerTrainer,
  updateTrainer,
  getTrainer,
  deleteTrainer,
  getAllTrainers,
  getOneDayScheduleByTrainer
}
