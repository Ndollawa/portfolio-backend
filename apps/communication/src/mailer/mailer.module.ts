import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
  imports: [
    MailerModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
      transport:{
        host: configService.get('SENDGRID_HOST'),
        auth:{
          user: configService.get('SENDGRID_USER'),
          pass: configService.get('SENDGRID_PASSWORD')
        }
      }
      template:{
        dir: join(__dirname,'templates'),
        adapter: new HandlebarsAdapter()
      }
    }),
      inject: [ConfigService],
    })
  ]
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
