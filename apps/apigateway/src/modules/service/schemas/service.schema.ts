import mongoose from "mongoose";

const ServiceSchema =  new mongoose.Schema({

    title:{
        type:String,
        required: true,
        unique: true
    },
    body:{
        type:String,
        required: true
    },
    description:{
        type:String
        
    },
    coverImage:{
     type:String
    },
    tags:{
        type:[String],
        required: true
    },
    category:{
        type:String,
        required: true
    },
    status:{
        type:String,
        enum: {
            values: ['draft', 'published'],
            message: '{VALUE} is not supported'
          },
        default:'draft',
        required: true   
    },

},
{timestamps:true});
// ServiceSchema.plugin(mongoosePaginate);
export default ServiceSchema;