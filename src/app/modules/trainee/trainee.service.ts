import { PrismaClient } from '@prisma/client';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { makeHashPassword } from '../../../shared/hashPassword';
import { IUser } from '../auth/auth.interface';

const prisma = new PrismaClient();

const getTrainee = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

const updateTrainee = async (id: number, data: IUser) => {
  const hashedPassword = await makeHashPassword(data.password);
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      image: data.image,
      gender: data.gender,
      email: data.email,
      password: hashedPassword,
      role: ENUM_USER_ROLE.TRAINEE,
    },
  });
  return user;
};

export const TrainerService = {
  getTrainee,
  updateTrainee,
};
