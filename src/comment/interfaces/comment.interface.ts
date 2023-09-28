import { Document } from 'mongoose';

export interface CommentInterface extends Document {
  postId: string;
  author: string;
  authorType: string;
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  fullName: string;
  comment: string;
  status: string;
}
