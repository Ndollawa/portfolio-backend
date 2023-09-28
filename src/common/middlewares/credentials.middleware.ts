import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import allowedOrigins from '../config/allowedOrigins.js';

export class CredentialsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin!)) {
      res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
  }
}
