import { CommentController } from './comment.controller';
import { CommentModule } from './comment.module';
import { CommentRepository } from './comment.repository';
import CommentSchema from './schemas/comment.schema';
import { CommentInterface } from './interfaces/comment.interface';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

export {
  CommentController,
  CommentModule,
  CommentRepository,
  CommentSchema,
  CommentInterface,
  CommentService,
  CreateCommentDto,
  UpdateCommentDto,
};
