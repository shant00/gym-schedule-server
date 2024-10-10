import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { classScheduleController } from './classSchedule.controller';

const router = express.Router();

router.get(
  '/all',
  auth(ENUM_USER_ROLE.TRAINEE, ENUM_USER_ROLE.TRAINER, ENUM_USER_ROLE.ADMIN),
  classScheduleController.getAllSchedules
);

router.get(
  '/trainer/:id',
  auth(ENUM_USER_ROLE.TRAINEE, ENUM_USER_ROLE.TRAINER, ENUM_USER_ROLE.ADMIN),
  classScheduleController.getTrainerOneDaySchedule
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.TRAINEE, ENUM_USER_ROLE.TRAINER, ENUM_USER_ROLE.ADMIN),

  classScheduleController.getSchedule
);

router.put(
  '/:id',
  auth(ENUM_USER_ROLE.TRAINEE, ENUM_USER_ROLE.TRAINER, ENUM_USER_ROLE.ADMIN),
  classScheduleController.updateSchedule
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.TRAINEE, ENUM_USER_ROLE.TRAINER, ENUM_USER_ROLE.ADMIN),
  classScheduleController.deleteSchedule
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.TRAINEE, ENUM_USER_ROLE.TRAINER, ENUM_USER_ROLE.ADMIN),
  classScheduleController.getOneDaySchedule
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.TRAINEE, ENUM_USER_ROLE.TRAINER, ENUM_USER_ROLE.ADMIN),
  classScheduleController.createSchedule
);

export const ClassSchedule = router;
