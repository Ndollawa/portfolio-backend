import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CredentialsMiddleware } from './common/middlewares/credentials.middleware';
import { ErrorHandler } from './common/middlewares/error-handler.middleware';
import * as config from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  // const server = config.get('server');
  const port = process.env.PORT || 3500; //server.port;
  app.use(CredentialsMiddleware);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  app.use(cookieParser());
  app.use(ErrorHandler);
  app.enableVersioning();
  await app.listen(port);
}
bootstrap();
