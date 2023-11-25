import { Document } from 'mongoose';

export interface CategoryInterface extends Document {
  title: string;
  type: string;
  status: string | boolean;
}
