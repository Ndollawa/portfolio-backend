import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express/multer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@app/prisma';
import {
  LoggingInterceptor,
  // ResponseInterceptor,
  RequestService,
} from '@app/common';

import { UserService, UserModule, UserRepository, RefreshTokenService, RefreshTokenRepository } from '../user';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
      cache: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '1800s' },
      }),
      inject: [ConfigService],
    }),
    // ClientsModule.register([
    //   {
    //     name: COMMUNICTION_SERVICE,
    //     transport: Transport.GRPC,
    //     options: {
    //       package: COMMUNICATION_PACKAGE_NAME,
    //       protoPath: join(__dirname, '../../communication/communication.proto'),
    //     },
    //   },
    // ]),
    PrismaModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    RequestService,
    UserRepository,
    UserService,
    RefreshTokenService,
    RefreshTokenRepository,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AuthModule {}
