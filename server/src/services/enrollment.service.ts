import { Types } from "mongoose";
import Enrollment, { IEnrollment } from "../schemas/enrollment.schema";
import BaseError from "../utils/base.error";
import SELECT from "../utils/select";
import { CreateEnrollmentDto } from "../validators/enrollment.validator";
import EnrollStatus from "../enums/enrollStatus";
import Course from "../schemas/course.schema";
import Student from "../schemas/student.schema";

class StudentService {
  async getAll(courseId?: string, studentId?: string, page = 1, limit = 10) {
    let filter: any = {};

    if (courseId && Types.ObjectId.isValid(courseId)) {
      filter.courseId = courseId;
    }
    if (studentId && Types.ObjectId.isValid(studentId)) {
      filter.studentId = studentId;
    }

    const enrollments = await Enrollment.find(filter)
      .populate("studentId")
      .populate("courseId")
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    return enrollments;
  }

  async create(data: CreateEnrollmentDto): Promise<IEnrollment> {
    if (!Types.ObjectId.isValid(data.courseId)) {
      throw BaseError.BadRequest("Invalid course ID format.");
    }
    if (!Types.ObjectId.isValid(data.studentId)) {
      throw BaseError.BadRequest("Invalid student ID format.");
    }

    const course = await Course.findById(data.courseId);
    if (!course) {
      throw BaseError.NotFoundError("Course not found.");
    }

    const student = await Student.findById(data.studentId);
    if (!student) {
      throw BaseError.NotFoundError("Student not found.");
    }

    const existingEnrollment = await Enrollment.findOne({
      studentId: data.studentId,
      courseId: data.courseId,
    });

    if (existingEnrollment) {
      throw BaseError.BadRequest("Student is already enrolled in this course.");
    }

    const enroll = new Enrollment(data);
    return await enroll.save();
  }

  async completed(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid ID format.");
    }

    const student = await Enrollment.findByIdAndUpdate(id, {
      status: EnrollStatus.COMPLETED,
    });

    if (!student) {
      throw BaseError.NotFoundError("Enrollment not found.");
    }

    return { message: "Enrollment completed successfully.", success: true };
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid ID format.");
    }

    const student = await Enrollment.findByIdAndDelete(id);

    if (!student) {
      throw BaseError.NotFoundError("enrollment not found.");
    }

    return { message: "Student deleted successfully.", success: true };
  }
}

export default new StudentService();
