
  import mongoose, { Document, Schema } from 'mongoose';

interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  isBlock: boolean;
  isAdmin:boolean;
}

 
const studentSchema: Schema<IStudent> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isBlock: {
      type: Boolean,
      default: false,   
    },
    isAdmin:{
      type:Boolean,
      default:false
    }
  }
);

 
const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;
