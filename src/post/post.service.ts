import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostInterface } from './interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getPostById(postId: string): Promise<PostInterface> {
    return this.postRepository.findOne({ _id: postId });
  }

  async getPosts(): Promise<PostInterface[]> {
    return this.postRepository.find({});
  }

  async createPost(createPostData: CreatePostDto): Promise<PostInterface> {
    return this.postRepository.create(createPostData);
  }

  async updatePost(
    postId: string,
    updatePostData: UpdatePostDto,
  ): Promise<PostInterface> {
    return this.postRepository.findOneAndUpdate(
      { _id: postId },
      updatePostData,
    );
  }

  async deletePostById(postId: string): Promise<boolean> {
    return this.postRepository.deleteOne({ _id: postId });
  }

  async deleteManyPosts(postIds: string): Promise<boolean> {
    return this.postRepository.deleteMany({ _id: postIds });
  }
}
