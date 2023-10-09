import { NestMiddleware, Injectable } from '@nestjs/common';

import * as fs from 'fs';
const fsPromise = fs.promises;
import path from 'path';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { Request, Response, NextFunction } from 'express';

const logEvents = async (message: string, logName: string) => {
  const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromise.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromise.appendFile(
      path.join(__dirname, '..', 'logs', logName),
      logItem,
    );
  } catch (err) {
    console.log(err);
  }
};

@Injectable()
class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method}\t${req.path}`);
    next();
  }
}
export { Logger, logEvents };
