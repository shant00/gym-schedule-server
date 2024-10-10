import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IClassSchedule } from "./classSchedule.interface";
import { classScheduleService } from "./classSchedule.service";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const classSchedule: IClassSchedule =
    await classScheduleService.createSchedule(req.body);

  sendResponse<IClassSchedule>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Class Scheduled successfully !",
    data: classSchedule,
  });
});

const updateSchedule = catchAsync(async (req: Request, res: Response) => {
  const classSchedule: IClassSchedule =
    await classScheduleService.updateSchedule(Number(req.params.id), req.body);

  sendResponse<IClassSchedule>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class Schedule updated successfully !",
    data: classSchedule,
  });
});

const getSchedule = catchAsync(async (req: Request, res: Response) => {
  const classSchedule: IClassSchedule | null =
    await classScheduleService.getSchedule(Number(req.params.id));

  sendResponse<IClassSchedule>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class Schedule fetched successfully !",
    data: classSchedule,
  });
});
const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  await classScheduleService.deleteSchedule(Number(req.params.id));
  sendResponse<IClassSchedule>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class Schedule deleted successfully !",
  });
});

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const classSchedules: IClassSchedule[] =
    await classScheduleService.getAllSchedules();
  sendResponse<IClassSchedule[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class Schedules fetched successfully !",
    data: classSchedules,
  });
});
const getOneDaySchedule = catchAsync(async (req: Request, res: Response) => {
  const classSchedules: IClassSchedule[] =
    await classScheduleService.getOneDaySchedule();
  sendResponse<IClassSchedule[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class Schedules fetched successfully !",
    data: classSchedules,
  });
});

const getTrainerOneDaySchedule = catchAsync(async (req: Request, res: Response) => {
  const classSchedules: IClassSchedule[] =
    await classScheduleService.getTrainerOneDaySchedule(Number(req.params.id));
  sendResponse<IClassSchedule[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class Schedules fetched successfully !",
    data: classSchedules,
  });
});

export const classScheduleController = {
  createSchedule,
  updateSchedule,
  getSchedule,
  deleteSchedule,
  getAllSchedules,
  getOneDaySchedule,
  getTrainerOneDaySchedule
};
