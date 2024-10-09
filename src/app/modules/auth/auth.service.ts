import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { makeHashPassword } from '../../../shared/hashPassword';
import { IUser } from './auth.interface';

const prisma = new PrismaClient();

const registerUser = async (data: IUser) => {
  const hashedPassword = await makeHashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      image: data.image,
      gender: data.gender,
      email: data.email,
      password: hashedPassword,
      role: ENUM_USER_ROLE.ADMIN,
    },
  });

  return user;
};


const loginUser = async (data: IUser) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret!, { expiresIn: config.jwt.expires_in });

  return {
    id: user.id,
    role: user.role,
    accessToken: token,
  };
};


export const AuthService = {
  registerUser,
  loginUser
};
