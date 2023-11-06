import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentInterface } from './interfaces/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Get()
  async getComments(): Promise<CommentInterface[]> {
    return await this.commentService.getComments();
  }

  @Get()
  async getCommentById(@Param() id: string): Promise<CommentInterface> {
    return await this.commentService.getCommentById(id);
  }

  @Post()
  async createComment(
    @Body() createCommentData: CreateCommentDto,
  ): Promise<CommentInterface> {
    return await this.commentService.createComment(createCommentData);
  }

  @Put(':id')
  async updateComment(
    @Param() id: string,
    @Body() updateCommentData: UpdateCommentDto,
  ): Promise<CommentInterface> {
    return await this.commentService.updateComment(id, updateCommentData);
  }

  @Delete()
  async deleteComments(): Promise<CommentInterface[]> {
    return await this.commentService.getComments();
  }
}
