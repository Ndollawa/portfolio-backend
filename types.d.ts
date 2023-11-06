import { Request } from 'express';
import { UserInterface } from 'src/user';

declare global {
  namespace Express {
    interface Request {
      user: UserInterface;
    }
  }
}
