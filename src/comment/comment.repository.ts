import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentInterface } from './interfaces/comment.interface';
import { EntityRepository } from 'src/common/database/entity-repository';

@Injectable()
export class CommentRepository extends EntityRepository<CommentInterface> {
  constructor(@InjectModel('Comment') commentModel: Model<CommentInterface>) {
    super(commentModel);
  }
}
