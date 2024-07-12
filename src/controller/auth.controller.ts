import { Request, Response, NextFunction } from 'express';
import { signIn, signUp } from '../service/auth.service';

export class AuthController {
  signin(req: Request, res: Response, next: NextFunction) {
    return signIn(req, res, next);
  }

  signup(req: Request, res: Response, next: NextFunction) {
    return signUp(req, res, next);
  }
}
