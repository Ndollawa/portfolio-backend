import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryInterface } from './interfaces/category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getCategories(): Promise<CategoryInterface[]> {
    return await this.categoryService.getCategories();
  }

  @Get()
  async getCategoryById(@Param() id: string): Promise<CategoryInterface> {
    return await this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(
    @Body() createCategoryData: CreateCategoryDto,
  ): Promise<CategoryInterface> {
    return await this.categoryService.createCategory(createCategoryData);
  }

  @Put(':id')
  async updateCategory(
    @Param() id: string,
    @Body() updateCategoryData: UpdateCategoryDto,
  ): Promise<CategoryInterface> {
    return await this.categoryService.updateCategory(id, updateCategoryData);
  }

  @Delete()
  async deleteCategories(): Promise<CategoryInterface[]> {
    return await this.categoryService.getCategories();
  }
}
