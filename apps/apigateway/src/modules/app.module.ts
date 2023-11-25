import { Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { MulterModule } from '@nestjs/platform-express/multer';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project';
import { UserModule, UserService } from './user';
import { ServiceModule } from './service';
import { CommentModule } from './comment';
import { ReplyModule } from './reply';
import { CategoryModule } from './category';
import { SettingsModule } from './settings';
import { AuthModule } from './auth';
import { PostModule } from './post';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { RequestService } from './request.service';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // uri: configService.get('database.url'),
        uri: configService.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ProjectModule,
    UserModule,
    ServiceModule,
    CommentModule,
    PostModule,
    ReplyModule,
    CategoryModule,
    SettingsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    RequestService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
