import { Router } from 'express';

import { loginUser } from '@/controllers/user.controllers.js';

const userRouter = Router();

userRouter.post('/login', loginUser);

export { userRouter };
