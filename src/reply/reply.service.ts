import { Injectable } from '@nestjs/common';
import { ReplyRepository } from './reply.repository';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { ReplyInterface } from './interfaces/reply.interface';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository) {}

  async getReplyById(replyId: string): Promise<ReplyInterface> {
    return this.replyRepository.findOne({ _id: replyId });
  }

  async getReplies(): Promise<ReplyInterface[]> {
    return this.replyRepository.find({});
  }

  async createReply(createReplyData: CreateReplyDto): Promise<ReplyInterface> {
    return this.replyRepository.create(createReplyData);
  }

  async updateReply(
    replyId: string,
    updateReplyData: UpdateReplyDto,
  ): Promise<ReplyInterface> {
    return this.replyRepository.findOneAndUpdate(
      { _id: replyId },
      updateReplyData,
    );
  }

  async deleteReplyById(replyId: string): Promise<boolean> {
    return this.replyRepository.deleteOne({ _id: replyId });
  }

  async deleteManyReplies(replyIds: string): Promise<boolean> {
    return this.replyRepository.deleteMany({ _id: replyIds });
  }
}
