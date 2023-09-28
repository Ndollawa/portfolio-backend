import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interfaces/user.interface';
import { EntityRepository } from 'src/common/database/entity-repository';

@Injectable()
export class UserRepository extends EntityRepository<UserInterface> {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {
    super(userModel);
  }
}
