import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse();
    const { ip, method, path: url } = response;

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
