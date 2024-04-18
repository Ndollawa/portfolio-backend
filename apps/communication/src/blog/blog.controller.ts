import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @MessagePattern('createBlog')
  create(@Payload() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @MessagePattern('findAllBlog')
  findAll() {
    return this.blogService.findAll();
  }

  @MessagePattern('findOneBlog')
  findOne(@Payload() id: number) {
    return this.blogService.findOne(id);
  }

  @MessagePattern('updateBlog')
  update(@Payload() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(updateBlogDto.id, updateBlogDto);
  }

  @MessagePattern('removeBlog')
  remove(@Payload() id: number) {
    return this.blogService.remove(id);
  }
}
