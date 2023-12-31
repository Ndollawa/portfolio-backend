import { ObjectId, Document } from 'mongoose';
export enum PostStatusEnum {
  PUBLISHED = 'published',
  DRAFT = 'draft',
}

export interface PostInterface extends Document {
  title: string;
  author: ObjectId;
  description: string;
  body: string;
  tags: string[];
  image: string;
  category: string;
  readCount: number;
  readingTime: string;
  status: string;
}
