import express from 'express';
import { AuthController } from '../controller/auth.controller';
import {
  isEmailExisted,
  isPasswordCorrect,
  validationResources,
} from '@/utils/middleware/validator';
import { userSchema } from '@/lib/data/user/schema';

const router = express.Router();
const authController = new AuthController();

// Signin
router.post('/signin', authController.signin);
router.post(
  '/signup',
  validationResources(userSchema),
  isEmailExisted,
  isPasswordCorrect,
  authController.signup
);

export default router;
