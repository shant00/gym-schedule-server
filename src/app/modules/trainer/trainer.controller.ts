import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../auth/auth.interface";
import { IClassSchedule } from '../classSchedule/classSchedule.interface';
import { TrainerService } from "./trainer.service";

const registerTrainer = catchAsync(async (req: Request, res: Response) => {
  const user: IUser = await TrainerService.registerTrainer(req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully !',
    data: user,
  });

});

const updateTrainer = catchAsync(async (req: Request, res: Response) => {
  const user: IUser = await TrainerService.updateTrainer(Number(req.params.id), req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: user,
  });
})

const getTrainer = catchAsync(async (req: Request, res: Response) => {
  const user: IUser | null = await TrainerService.getTrainer(Number(req.params.id));

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully !',
    data: user,
  });
})

const deleteTrainer = catchAsync(async (req: Request, res: Response) => {
  await TrainerService.deleteTrainer(Number(req.params.id));
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',

  });
})

const getAllTrainers = catchAsync(async (req: Request, res: Response) => {
  const users: IUser[] = await TrainerService.getAllTrainers();
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully !',
    data: users,
  });
});

const getOneDayScheduleByTrainer = catchAsync(async (req: Request, res: Response) => {
  const schedules = await TrainerService.getOneDayScheduleByTrainer(Number(req.params.id));
  sendResponse<IClassSchedule[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully !',
    data: schedules,
  });
})

export const TrainerController = {
  registerTrainer,
  updateTrainer,
  getTrainer,
  deleteTrainer,
  getAllTrainers,
  getOneDayScheduleByTrainer
};