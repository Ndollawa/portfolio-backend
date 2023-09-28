import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReplyInterface } from './interfaces/reply.interface';
import { EntityRepository } from 'src/common/database/entity-repository';

@Injectable()
export class ReplyRepository extends EntityRepository<ReplyInterface> {
  constructor(@InjectModel('Reply') replyModel: Model<ReplyInterface>) {
    super(replyModel);
  }
}
