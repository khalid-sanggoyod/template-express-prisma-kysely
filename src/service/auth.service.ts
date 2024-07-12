import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { createDbClient } from '@/config/db/create-db-client';
import { AppError } from '@/utils/error/AppError';
import { config } from '@/config';
import { IUser } from '@/lib/interfaces/user.interface';
import { User } from '@/lib/data/user/User';
import { CreateUser } from '@/lib/data/user/schema';

const dbClient = createDbClient();

export async function signIn(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('signin', async (err: any, user: IUser, info: string) => {
    try {
      const { message }: any = info;

      if (err || !user) {
        return next(new AppError(message, 401));
      }

      return req.login(user, { session: false }, async error => {
        if (error) return next(error);

        const body = { _id: user.id, email: user.email, role: user.role };
        const token = jwt.sign({ user: body }, config.JWT_SECRET as string, {
          expiresIn: '1d',
        });

        if (user.role !== 'ADMIN') {
          return next(new AppError('Unauthorized', 401));
        }

        return res.status(200).json({
          success: true,
          message: 'Signin successful',
          token,
          data: user,
        });
      });
    } catch (error: any) {
      console.log('Error: ', error);
    }
  })(req, res, next);
}

export async function signUp(req: Request<{}, {}, CreateUser>, res: Response, next: NextFunction) {
  try {
    let hashedPassword;
    if (typeof req.body.password === 'string') {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Rest of your code using hashedPassword
    }

    const payload = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    };

    const createdUser = new User(dbClient, payload);

    await createdUser.createUsersData();

    if (!createdUser) throw new AppError('No user created. Please try again.', 404);

    return res.status(201).json({ message: 'Post created' });
  } catch (error) {
    next(error);
  }
}
