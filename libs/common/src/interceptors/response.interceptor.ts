import { Injectable, NestInterceptor, ExecutionContext, CallHandler,Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatusObject } from '@grpc/grpc-js';

interface Response<T> {
  status: string;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(ResponseInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    let statusCode: StatusObject | number;
    const now = new Date()?.toISOString();
  switch (context.getType()) {
    case 'rpc':
        const grpcContext = context.switchToRpc().getContext();
        statusCode = grpcContext.getStatus();

      break;

    case 'http':
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      statusCode = response.statusCode;
      const { ip, method, path: url } = request;
      break;
  
    default:
      break;
  }
  

    return next.handle().pipe(
      map(data => ({
        status: 'success',
        statusCode,
        message: 'Request successful',
        timestamp:now,
        data,
      })),
    );
  }
}
