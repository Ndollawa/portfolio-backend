import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AUTH_SERVICE
} from '@app/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@/apigateway/src/modules/user/user.module';

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
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
