import { MiddlewareContext, NestMiddleware } from '@nestjs/common';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Metadata, ServerUnaryCall } from '@grpc/grpc';
import { AuthService } from '@apps/auth/modules/auth/auth.service';

@Injectable()
export class GrpcAuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(context: ExecutionContext, next: () => void): Promise<void> {
    const ctx: MiddlewareContext = context.switchToHttp();
    const call: ServerUnaryCall<any> = ctx.getRequest();
    const metadata: Metadata = call.metadata;

    // Extract authentication information from metadata
    const token = metadata.get('authorization')[0];

    // Authenticate based on the extracted token
    const user = await this.authService.authenticate(token);

    // Attach the authenticated user to the request
    ctx.getRequest().user = user;

    // Continue with the request handling
    await next();
  }
}
