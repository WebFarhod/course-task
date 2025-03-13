import { Schema, model, Document } from "mongoose";

export interface IStudent extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  phone: string;
  isActive: boolean;
}

const StudentSchema: Schema<IStudent> = new Schema<IStudent>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Student = model<IStudent>("Student", StudentSchema);

export default Student;
