import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';import { join } from 'path';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AUTH_SERVICE
} from '@app/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ 
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../../auth/auth.proto'),
        },
      },
    ])],
  providers:[UserService],
  controllers: [UserController],
  exports:[UserService],
})
export class UserModule {}
