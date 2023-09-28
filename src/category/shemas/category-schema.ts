import mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive'],
        message: '{VALUE} is not supported',
      },
      default: 'active',
      required: true,
    },
  },
  { timestamps: true },
);
CategorySchema.plugin(mongoosePaginate);
export default CategorySchema;
