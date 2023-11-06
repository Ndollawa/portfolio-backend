import {
  Injectable,
  HttpException,
  ArgumentsHost,
  Logger,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception?.getStatus();
    // const message = exception.message;
    const error = exception?.getResponse() as object;
    // const stack = exception.stack;
    res?.status(status)?.json({
      // statusCode: status,
      timestamp: new Date()?.toISOString(),
      path: req.url,
      ...error,
    });
  }
}
