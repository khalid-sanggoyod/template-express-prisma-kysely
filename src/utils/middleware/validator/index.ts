import { Request, Response, NextFunction } from 'express';
import { createDbClient } from '@/config/db/create-db-client';
import { User } from '@/lib/data/user/User';
import bcrypt from 'bcrypt';
import { AppError } from '@/utils/error/AppError';
import { AnyZodObject } from 'zod';

const dbClient = createDbClient();

export const isPasswordCorrect = (req: Request, res: Response, next: NextFunction) => {
  const { confirm_password, password } = req.body;

  if (confirm_password !== password) {
    return next(new AppError("Password don't match", 400));
  }

  next();
};

export const isEmailExisted = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const [userExist] = await User.getUserByEmailData({ dbClient, email });

  if (userExist) {
    return next(new AppError('This email is already exist', 400));
  }

  next();
};

export const isValidPassword = async (password: any, dbPassword: any) => {
  return bcrypt.compare(password, dbPassword);
};

export const validationResources =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      // Extract specific validation errors from ZodError
      const validationErrors = error.issues.map((issue: any) => {
        return {
          message: issue.message,
          fieldError: issue.path[0],
        };
      });

      return res.status(400).json({
        success: false,
        error: validationErrors, // Combine and display all errors
      });
    }
  };
