import { Request } from 'express';
import { User } from '@app/common';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
