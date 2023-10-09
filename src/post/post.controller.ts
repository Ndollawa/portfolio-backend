import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostStatusValidationPipe } from './pipes/post-status-validation.pipes';

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
  // @UsePipes(PostStatusValidationPipe)
  async createPost(
    @Body(ValidationPipe) createPostData: CreatePostDto,
  ): Promise<PostInterface> {
    return await this.postService.createPost(createPostData);
  }

  @Patch(':id')
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePostData: UpdatePostDto,
  ): Promise<PostInterface> {
    return await this.postService.updatePost(id, updatePostData);
  }

  @Delete(':id')
  async deletePosts(@Param('id') id: string): Promise<boolean> {
    return await this.postService.deletePostById(id);
  }
}
