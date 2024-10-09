import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { TrainerRoutes } from '../modules/trainer/trainer.route';
const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleRoutes = [

    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/trainer",
        route: TrainerRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
