import { getUsers } from '@/service/user.service';
import { Request, Response, NextFunction } from 'express';

export class UserController {
  getusers(req: Request, res: Response, next: NextFunction) {
    return getUsers(req, res, next);
  }
}
