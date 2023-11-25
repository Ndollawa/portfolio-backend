import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryInterface } from './interfaces/category.interface';
import { RequestService } from '../request.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly requestService: RequestService,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getCategoryById(categoryId: string): Promise<CategoryInterface> {
    return this.categoryRepository.findOne({ _id: categoryId });
  }

  async getCategories(
    params: Partial<CategoryInterface>,
  ): Promise<CategoryInterface[]> {
    // const user = this.requestService.getUser();
    // console.log('user:', user._id);
    let query = {};
    const { type, status } = params;
    if (status) query = { ...query, status };
    if (type) query = { ...query, type };
    return this.categoryRepository.find(query);
  }

  async createCategory(
    createCategoryData: CreateCategoryDto,
  ): Promise<CategoryInterface> {
    const user = this.requestService.getUser();
    return this.categoryRepository.create({
      ...createCategoryData,
      user: user._id,
    });
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
