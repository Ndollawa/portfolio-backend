import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostInterface } from './interfaces/post.interface';
import { EntityRepository } from 'src/common/database/entity-repository';

@Injectable()
export class PostRepository extends EntityRepository<PostInterface> {
  constructor(@InjectModel('Post') postModel: Model<PostInterface>) {
    super(postModel);
  }
}
