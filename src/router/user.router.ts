import express from 'express';
import { UserController } from '@/controller/user.controller';

const router = express.Router();
const userController = new UserController();

// Signin
router.get('/get-users', userController.getusers);

export default router;
