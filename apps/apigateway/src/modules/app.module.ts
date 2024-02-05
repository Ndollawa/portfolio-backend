import { Module, Scope } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express/multer';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ProjectModule } from './project';
import { UserModule, UserService } from './user';
// import { ServiceModule } from './service';
// import { CommentModule } from './comment';
// import { ReplyModule } from './reply';
// import { CategoryModule } from './category';
// import { SettingsModule } from './settings';
import { AuthModule } from './auth';
// import { PostModule } from './post';
import { join } from 'path';
import {
  LoggingInterceptor,
  ResponseInterceptor,
  RequestService,
  HttpExceptionFilter,
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AUTH_SERVICE
} from '@app/common';

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
    AuthModule,
    UserModule,
    // ProjectModule,
    // ServiceModule,
    // CommentModule,
    // PostModule,
    // ReplyModule,
    // CategoryModule,
    // SettingsModule,
  ],
  providers: [
    UserService,
    RequestService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
