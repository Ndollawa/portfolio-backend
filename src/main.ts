import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CredentialsMiddleware } from './common/middlewares/credentials.middleware';
import { ErrorHandler } from './common/middlewares/error-handler.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.enableCors({
    origin: ['*'],
    credentials: true,
  });
  app.use(cookieParser());
  // app.use(new CredentialsMiddleware());
  // app.use(ErrorHandler);
  await app.listen(3500);
}
bootstrap();
