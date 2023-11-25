import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyInterface } from './interfaces/reply.interface';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Controller('replys')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}
  @Get()
  async getReplys(): Promise<ReplyInterface[]> {
    return await this.replyService.getReplies();
  }

  @Get()
  async getReplyById(@Param() id: string): Promise<ReplyInterface> {
    return await this.replyService.getReplyById(id);
  }

  @Post()
  async createReply(
    @Body() createReplyData: CreateReplyDto,
  ): Promise<ReplyInterface> {
    return await this.replyService.createReply(createReplyData);
  }

  @Put(':id')
  async updateReply(
    @Param('id') id: string,
    @Body() updateReplyData: UpdateReplyDto,
  ): Promise<ReplyInterface> {
    return await this.replyService.updateReply(id, updateReplyData);
  }

  @Delete()
  async deleteReplys(@Param('id') id: string): Promise<boolean> {
    return await this.replyService.deleteReplyById(id);
  }
}
