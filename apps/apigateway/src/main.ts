import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';
import * as express from 'express';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
  // UnprocessableEntityException,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { CredentialsMiddleware } from '@/common/middlewares/credentials.middleware';
import { ErrorHandler } from '@/common/middlewares/error-handler.middleware';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            // error: Object.values(error.constraints).join(', '),
            error: Object.values(error.constraints),
          })),
        );
      },
    }),
  );
  app.use(express.urlencoded({ extended: true, limit: '200mb' }));
  app.use(express.json({ limit: '200mb' }));
  app.use(CredentialsMiddleware);
  app.use(cookieParser());
  const devPort = app.get(ConfigService).get('DEVELOPMENT_PORT');
  const port = process.env.PORT || devPort;
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  // app.use(ErrorHandler);
  app.enableVersioning();
  await app.listen(port);
}
bootstrap();
