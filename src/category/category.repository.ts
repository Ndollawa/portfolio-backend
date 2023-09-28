import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryInterface } from './interfaces/category.interface';
import { EntityRepository } from 'src/common/database/entity-repository';

@Injectable()
export class CategoryRepository extends EntityRepository<CategoryInterface> {
  constructor(
    @InjectModel('Category') categoryModel: Model<CategoryInterface>,
  ) {
    super(categoryModel);
  }
}
