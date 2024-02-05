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

    const status: number | (()=>number) = exception.getStatus ? exception.getStatus(): exception?.getStatus || 500;
    const message = exception.message; 
    const error = typeof exception.getResponse === 'function' ? exception.getResponse() : (exception?.getResponse?.() || exception);


    res?.status(status as number)?.json({
      statusCode: status,
      timestamp: new Date()?.toISOString(),
      path: req.url,
      error,
    });
  }
}
