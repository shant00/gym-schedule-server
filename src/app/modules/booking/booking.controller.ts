import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBooking } from './booking.interface';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const booking: IBooking = await bookingService.createBooking(req.body);
  sendResponse<IBooking>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking created successfully !',
    data: booking,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const booking: IBooking = await bookingService.updateBooking(
    Number(req.params.id),
    req.body
  );
  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully !',
    data: booking,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  await bookingService.deleteBooking(Number(req.params.id));
  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully !',
  });
});

const traineesBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings: IBooking[] = await bookingService.traineesBookings(
    Number(req.params.id)
  );

  sendResponse<IBooking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trainee's bookings fetched successfully !",
    data: bookings,
  });
});

export const BookingController = {
  createBooking,
  updateBooking,
  deleteBooking,
  traineesBookings,
};
