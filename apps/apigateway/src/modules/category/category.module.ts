import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import CategorySchema from './schemas/category-schema';
import { CategoryRepository } from './category.repository';
import { RequestService } from '../request.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  providers: [CategoryService, CategoryRepository, RequestService],
  controllers: [CategoryController],
})
export class CategoryModule {}
