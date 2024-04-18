import { Module } from '@nestjs/common';
import {EventEmitterModule} from '@nestjs/event-emitter'
import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';
import { MailerModule } from './mailer/mailer.module';
import { SmsModule } from './chat/sms/sms.module';
import { SmsModule } from './sms/sms.module';
import { ChatModule } from './chat/chat.module';
import { VideocallModule } from './videocall/videocall.module';
import { CommentModule } from './comment/comment.module';
import { BlogModule } from './blog/blog.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MailerModule,
    SmsModule,
    ChatModule,
    VideocallModule,
    CommentModule,
    BlogModule,
    NotificationModule
  ],
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule {}
