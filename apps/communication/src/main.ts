import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { COMMUNICATION_PACKAGE_NAME } from '@app/common';
import { CommunicationModule } from './communication.module';

async function bootstrap() {
 const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CommunicationModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../communication.proto'),
        package:COMMUNICATION_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
