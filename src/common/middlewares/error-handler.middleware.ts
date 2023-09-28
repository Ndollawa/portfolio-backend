import { NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { logEvents } from './log-event.middleware.js';

export class ErrorHandler implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction, error?: any) {
    logEvents(`${error.name}: ${error.messsage}`, 'errLog.txt');
    console.error(error.stack);
    res.status(500).send(error.message);
    next();
  }
}
