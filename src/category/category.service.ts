import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryInterface } from './interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategoryById(categoryId: string): Promise<CategoryInterface> {
    return this.categoryRepository.findOne({ _id: categoryId });
  }

  async getCategories(): Promise<CategoryInterface[]> {
    return this.categoryRepository.find({});
  }

  async createCategory(
    createCategoryData: CreateCategoryDto,
  ): Promise<CategoryInterface> {
    return this.categoryRepository.create(createCategoryData);
  }

  async updateCategory(
    categoryId: string,
    updateCategoryData: UpdateCategoryDto,
  ): Promise<CategoryInterface> {
    return this.categoryRepository.findOneAndUpdate(
      { _id: categoryId },
      updateCategoryData,
    );
  }

  async deleteCategoryById(categoryId: string): Promise<boolean> {
    return this.categoryRepository.deleteOne({ _id: categoryId });
  }

  async deleteManyCategories(categoryIds: string): Promise<boolean> {
    return this.categoryRepository.deleteMany({ _id: categoryIds });
  }
}
