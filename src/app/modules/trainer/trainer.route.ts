import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/auth.validation';
import { TrainerController } from './trainer.controller';

const router = express.Router();

router.get(
  '/class-schedule/:id',
  auth(ENUM_USER_ROLE.TRAINER),
  TrainerController.getOneDayScheduleByTrainer
)

router.post(
  '/register',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AuthValidation.RegistrationZodSchema),
  TrainerController.registerTrainer
);

router.put(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINER),
  validateRequest(AuthValidation.RegistrationZodSchema),
  TrainerController.updateTrainer
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINER),
  TrainerController.getTrainer
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINER),
  TrainerController.deleteTrainer
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  TrainerController.getAllTrainers
);

export const TrainerRoutes = router;
