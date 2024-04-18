import { Module } from '@nestjs/common';
import { VideocallService } from './videocall.service';
import { VideocallController } from './videocall.controller';

@Module({
  controllers: [VideocallController],
  providers: [VideocallService],
})
export class VideocallModule {}
