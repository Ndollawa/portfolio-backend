import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { AUTH_PACKAGE_NAME, RequestService, AUTH_SERVICE } from '@app/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@/apigateway/src/modules/user/user.module';
import { LocalStrategy, JwtStrategy, JwtRefreshStrategy } from './strategies';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '1800s' },
      }),
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../../auth/auth.proto'),
        },
      },
    ]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    RequestService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
