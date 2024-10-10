import { PrismaClient } from '@prisma/client';
import { IBooking } from './booking.interface';

const prisma = new PrismaClient();

const createBooking = async (data: IBooking) => {
  const booking = await prisma.booking.create({
    data: {
      trainee: {
        connect: {
          id: data.traineeId,
        },
      },
      classSchedule: {
        connect: {
          id: data?.classId,
        },
      },
    },
  });

  return booking;
};

const updateBooking = async (id: number, data: IBooking) => {
  console.log(id);
  const booking = await prisma.booking.update({
    where: { id },
    data: {
      trainee: {
        connect: {
          id: data.traineeId,
        },
      },
      classSchedule: {
        connect: {
          id: data?.classId,
        },
      },
    },
  });

  return booking;
};

const deleteBooking = async (id: number) => {
  const booking = await prisma.booking.delete({ where: { id } });
  return booking;
};

const traineesBookings = async (traineeId: number) => {
  const bookings = await prisma.booking.findMany({
    where: {
      traineeId,
    },
    include: {
      classSchedule: true,
    },
  });

  return bookings;
};

export const bookingService = {
  createBooking,
  updateBooking,
  deleteBooking,
  traineesBookings,
};
