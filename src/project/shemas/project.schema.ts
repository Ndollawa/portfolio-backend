import mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { ProjectInterface } from '../interfaces/project.interface';

const ProjectSchema = new mongoose.Schema<ProjectInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    body: {
      type: String,
      required: true,
    },

    attachment: [
      {
        attachmentType: {
          type: String,
          required: true,
        },
        attachment: {
          type: String,
          required: true,
        },
      },
    ],
    coverImage: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['completed', 'in-progress', 'pending'],
        message: '{VALUE} is not supported',
      },
      default: 'completed',
      required: true,
    },
  },
  { timestamps: true },
);
ProjectSchema.plugin(mongoosePaginate);
export default ProjectSchema;
