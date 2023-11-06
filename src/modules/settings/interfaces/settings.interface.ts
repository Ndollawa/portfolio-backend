import { Document, ObjectId } from 'mongoose';

export interface SettingsInterface extends Document {
  title: string;
  author: ObjectId;
  description: string;
  body: string;
  tags: string[];
  attachment: {
    attachmentType: string;
    attachment: string;
  }[];
  coverImage: string;
  category: string;
  status: string;
}
