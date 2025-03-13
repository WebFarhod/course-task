import { Schema, model, Document } from "mongoose";

export interface ICourse extends Document {
  _id: string;
  title: string;
  image: string;
  price: number;
  isActive: boolean;
}

const CourseSchema: Schema<ICourse> = new Schema<ICourse>(
  {
    image: { type: String, required: false },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Course = model<ICourse>("Course", CourseSchema);

export default Course;
