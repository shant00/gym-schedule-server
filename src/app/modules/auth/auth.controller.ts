import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IUser } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const token: ILoginUserResponse = await AuthService.loginUser(req.body);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: token,
  });
});

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user: IUser = await AuthService.registerUser(req.body);

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully !',
    data: user,
  });
});

export const AuthController = {
  loginUser,
  registerUser,
};
