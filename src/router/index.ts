import express from 'express';
import authRoute from './auth.router';
import userRoute from './user.router';

const router = express.Router();

router.use('/api/auth', authRoute);
router.use('/api', userRoute);

export default router;
