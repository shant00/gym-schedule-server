import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../auth/auth.interface";
import { TrainerService } from "./trainee.service";


const getTrainee = catchAsync(async (req: Request, res: Response) => {
    const user: IUser | null = await TrainerService.getTrainee(Number(req.params.id));

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully !',
        data: user,
    });
});

const updateTrainee = catchAsync(async (req: Request, res: Response) => {
    const user: IUser = await TrainerService.updateTrainee(Number(req.params.id), req.body);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User updated successfully !',
        data: user,
    });
})

export const TraineeController = {
    getTrainee,
    updateTrainee
};