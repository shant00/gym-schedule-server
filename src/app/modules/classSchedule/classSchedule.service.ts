import { PrismaClient } from '@prisma/client';
import { IClassSchedule } from './classSchedule.interface';


const prisma = new PrismaClient();


const createSchedule = async (data: IClassSchedule) => {
  // // Step 1: Get the day from the startTime
  // const startOfDay = new Date(data.startTime);
  // startOfDay.setHours(0, 0, 0, 0); // Set time to the start of the day

  // const endOfDay = new Date(data.startTime);
  // endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day

  // // Step 2: Count existing class schedules for the day
  // const existingSchedulesCount = await prisma.classSchedule.count({
  //   where: {
  //     startTime: {
  //       gte: startOfDay, // Greater than or equal to start of day
  //     },
  //     endTime: {
  //       lte: endOfDay, // Less than or equal to end of day
  //     },
  //   },
  // });

  const existingSchedules = await getOneDaySchedule();

  // Step 3: Check if the existing count exceeds the limit of 5
  if (existingSchedules.length >= 5) {
    throw new Error('Cannot create more than five class schedules for a single day.');
  }

  // Step 4: Ensure the new class schedule does not overlap with existing ones
  const overlappingSchedules = await prisma.classSchedule.findMany({
    where: {
      startTime: {
        lt: data.endTime, // New start time must be before existing end time
      },
      endTime: {
        gt: data.startTime, // New end time must be after existing start time
      },
    },
  });

  if (overlappingSchedules.length > 0) {
    throw new Error('New class schedule overlaps with an existing schedule.');
  }

  const schedule = await prisma.classSchedule.create({
    data: {
      startTime: data.startTime,
      endTime: data.endTime,
      trainer: {
        connect: {
          id: data.trainerId,
        },
      },
      bookings: data.bookings ? {
        connect: data.bookings.map((booking: { id: number }) => ({ id: booking.id })),
      } : undefined,
    },
  });

  return schedule;

}
const getOneDaySchedule = async () => {
  // Step 1: Get today's date
  const now = new Date();

  // Step 2: Set start of the day (midnight) and end of the day (next midnight)
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0); // Start of today (00:00)

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999); // End of today (23:59:59.999)

  // Step 3: Query the database for class schedules within the day range
  const schedules = await prisma.classSchedule.findMany({
    where: {
      startTime: {
        gte: startOfDay, // Greater than or equal to start of day
      },
      endTime: {
        lte: endOfDay, // Less than or equal to end of day
      },
    },
    include: {
      trainer: true, // Include the trainer
      bookings: {
        include: {
          trainee: true, // Include the trainee data if needed
        },
      },
    },
  });

  // Step 4: Return the schedules
  return schedules;
};
const updateSchedule = async (id: number, data: IClassSchedule) => {
  const schedule = await prisma.classSchedule.update({
    where: { id },
    data: {
      startTime: data.startTime,
      endTime: data.endTime,
      trainer: {
        connect: {
          id: data.trainerId,
        },
      },
      bookings: data.bookings ? {
        connect: data.bookings.map((booking: { id: number }) => ({ id: booking.id })),
      } : undefined,
    },
  });

  return schedule;
}

const getSchedule = async (id: number) => {
  const schedule = await prisma.classSchedule.findUnique({ where: { id } });
  return schedule;
}

const deleteSchedule = async (id: number) => {
  const schedule = await prisma.classSchedule.delete({ where: { id } });
  return schedule;
}

const getAllSchedules = async () => {
  const schedules = await prisma.classSchedule.findMany();
  return schedules;
}



export const classScheduleService = {
  createSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
  getAllSchedules,
  getOneDaySchedule
}
