import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { ip, method, path: url } = request;

    this.logger.log(
      `${method}\t${url}\t ${ip} \t ${context.getClass().name} \t ${
        context.getHandler().name
      }`,
    );
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.logger.log(`After ${Date.now() - now}ms`)));
  }
}
