import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as grpc from '@grpc/grpc-js';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const isRpc = context.getType() === 'rpc';
    const now = Date.now();

    if (isRpc) {
      const call = context.switchToRpc().getContext();
      const method = call?.call?.getFullMethodName() || 'UNKNOWN_METHOD';
      const ip = call?.call?.getPeer() || 'UNKNOWN_IP';

      // Extracted RPC Controller and Method
      const [rpcController, rpcMethod] = method.split('/');
      this.logger.log(`Request received: RPC Controller - ${rpcController}, Method - ${rpcMethod}, from ${ip}`);
    } else {
      const request = context.switchToHttp().getRequest();
      const { ip, method, path: url } = request;

      this.logger.log(`${method}\t${url}\t ${ip} \t ${context.getClass().name} \t ${context.getHandler().name}`);
    }

    return next.handle().pipe(
      tap(() => {
        if (isRpc) {
          const call = context.switchToRpc().getContext();
          const duration = Date.now() - now;

          this.logger.log(`Response sent in ${duration}ms`);
        } else {
          this.logger.log(`After ${Date.now() - now}ms`);
        }
      }),
    );
  }
}
