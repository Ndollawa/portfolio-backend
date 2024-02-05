import { Response, Request, NextFunction } from 'express';
import { logEvents } from './logEvent.middleware';

export function ErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction,
  error?: any,
) {
  logEvents(`${error.name}: ${error.messsage}`, 'errLog.txt');
  console.error(error.stack);
  // res.sendStatus(500).send(error.message);
  next();
}
