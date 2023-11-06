import { PostController } from './post.controller';
import { PostModule } from './post.module';
import { PostRepository } from './post.repository';
import PostSchema from './schemas/post.schema';
import { PostInterface } from './interfaces/post.interface';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export {
  PostController,
  PostModule,
  PostRepository,
  PostSchema,
  PostInterface,
  PostService,
  CreatePostDto,
  UpdatePostDto,
};
