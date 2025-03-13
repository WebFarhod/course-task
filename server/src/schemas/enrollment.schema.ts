import { Schema, model, Document } from "mongoose";
import { IStudent } from "./student.schema";
import EnrollStatus from "../enums/enrollStatus";

export interface IEnrollment extends Document {
  _id: string;
  studentId: IStudent;
  courseId: IEnrollment;
  status: EnrollStatus;
  isActive: boolean;
}

const EnrollmentSchema: Schema<IEnrollment> = new Schema<IEnrollment>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(EnrollStatus),
      default: EnrollStatus.ACTIVE,
    },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Enrollment = model<IEnrollment>("Enrollment", EnrollmentSchema);

export default Enrollment;
