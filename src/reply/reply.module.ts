import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import ReplySchema from './schemas/reply.schema';
import { ReplyRepository } from './reply.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reply', schema: ReplySchema }]),
  ],
  providers: [ReplyService, ReplyRepository],
  controllers: [ReplyController],
})
export class ReplyModule {}
