import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';

import { DATABASE_URI } from './common/config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';
import { CategoryModule } from './category/category.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { PostModule } from './post/post.module';
@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URI),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
    }),
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
  providers: [AppService, UserService],
})
export class AppModule {}
