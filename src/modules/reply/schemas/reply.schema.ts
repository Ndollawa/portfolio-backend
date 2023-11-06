import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReplySchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorType: {
      type: String,
      enum: {
        values: ['guest', 'user'],
        message: '{VALUE} is not supported',
      },
      default: 'guest',
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      get: function () {
        return `${(this as any).firstName} ${(this as any).lastName}`;
      },
      set: function (fullName: string) {
        const name = fullName.split(' ');
        (this as any).firstName = name[0];
        (this as any).lastName = name[1];
        //   return `${(this as any).firstName} ${(this as any).lastName}`;
      },
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'disabled', 'deactivated', 'deleted'],
        message: '{VALUE} is not supported',
      },
      default: 'active',
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
// ReplySchema.virtual('fullName')
//   .get(function () {
//     return `${(this as any).firstName} ${(this as any).lastName}`;
//   })
//   .set(function (v) {
//     // `v` is the value being set, so use the value to set
//     // `firstName` and `lastName`.
//     const firstName = v.substring(0, v.indexOf(' '));
//     const lastName = v.substring(v.indexOf(' ') + 1);
//     this.set({ firstName, lastName });
//   });
//    set: function (fullName:string) {
//             const name = fullName.split(' ');
//             this.firstName  = name[0]
//             this.lastName  = name[1]
//         //   return `${(this as any).firstName} ${(this as any).lastName}`;
//         },
//       },
export default ReplySchema;
