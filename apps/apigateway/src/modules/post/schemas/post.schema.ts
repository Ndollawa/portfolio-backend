import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { PostInterface, PostStatusEnum } from '../interfaces/post.interface';

const PostSchema = new mongoose.Schema<PostInterface>(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['draft', 'published'],
        message: '{VALUE} is not supported',
      },
      default: 'draft',
      required: true,
    },
    readCount: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: String,
    },
  },
  { timestamps: true },
);
// PostSchema.plugin(mongoosePaginate);
export default PostSchema;
