import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileOptions } from '@/common/utils/helpers/file-filter.helper';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  async getPosts(): Promise<PostInterface[]> {
    return await this.postService.getPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostInterface> {
    return await this.postService.getPostById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', FileOptions('./uploads/posts/cover')),
  )
  async createPost(
    @Body(ValidationPipe) createPostData: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostInterface> {
    const data = {
      ...createPostData,
      tags: (createPostData?.tags as string)?.split(','),
      image: file.filename,
    };
    return await this.postService.createPost(data);
  }

  @Patch(':id')
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', FileOptions('./uploads/posts/cover')),
  )
  async updatePost(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePostData: UpdatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostInterface> {
    let data = {
      ...updatePostData,
      tags: (updatePostData?.tags as string)?.split(','),
    };
    if (file.filename) data = { ...data, image: file.filename };
    return await this.postService.updatePost(id, data);
  }

  @Delete(':id')
  async deletePosts(@Param('id') id: string): Promise<boolean> {
    return await this.postService.deletePostById(id);
  }
}
