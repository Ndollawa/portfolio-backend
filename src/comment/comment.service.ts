import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentInterface } from './interfaces/comment.interface';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getCommentById(commentId: string): Promise<CommentInterface> {
    return this.commentRepository.findOne({ _id: commentId });
  }

  async getComments(): Promise<CommentInterface[]> {
    return this.commentRepository.find({});
  }

  async createComment(
    createCommentData: CreateCommentDto,
  ): Promise<CommentInterface> {
    return this.commentRepository.create(createCommentData);
  }

  async updateComment(
    commentId: string,
    updateCommentData: UpdateCommentDto,
  ): Promise<CommentInterface> {
    return this.commentRepository.findOneAndUpdate(
      { _id: commentId },
      updateCommentData,
    );
  }

  async deleteCommentById(commentId: string): Promise<boolean> {
    return this.commentRepository.deleteOne({ _id: commentId });
  }

  async deleteManyComments(commentIds: string): Promise<boolean> {
    return this.commentRepository.deleteMany({ _id: commentIds });
  }
}
