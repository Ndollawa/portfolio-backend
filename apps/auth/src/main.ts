import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    { 
      logger: ['error', 'warn', 'log', 'debug'],
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../auth.proto'),
        package:AUTH_PACKAGE_NAME,
      },
    },);
  await app.listen();
}
bootstrap();
