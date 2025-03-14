import { Types } from "mongoose";
import Enrollment, { IEnrollment } from "../schemas/enrollment.schema";
import BaseError from "../utils/base.error";
import SELECT from "../utils/select";
import { CreateEnrollmentDto } from "../validators/enrollment.validator";
import EnrollStatus from "../enums/enrollStatus";
import Course, { ICourse } from "../schemas/course.schema";
import Student from "../schemas/student.schema";

class StudentService {
  async getAll(courseId?: string, studentId?: string, page = 1, limit = 10) {
    let filter: any = {};

    console.log(!!courseId && Types.ObjectId.isValid(courseId));

    if (!!courseId && Types.ObjectId.isValid(courseId)) {
      filter.courseId = courseId;
    }
    if (!!studentId && Types.ObjectId.isValid(studentId)) {
      filter.studentId = studentId;
    }

    const enrollments = await Enrollment.find(filter)
      .populate("studentId")
      .populate("courseId")
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    return enrollments;
  }

  async getCourse(studentId?: string, page = 1, limit = 10) {
    if (!studentId || !Types.ObjectId.isValid(studentId)) {
      console.log("test");

      return [];
    }

    const enrollments = await Enrollment.find({ studentId })
      .populate("courseId")
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const courses = enrollments.map((enrollment) => enrollment.courseId);

    return courses;
  }

  async getCompletedCourse(studentId?: string, page = 1, limit = 10) {
    if (!studentId || !Types.ObjectId.isValid(studentId)) {
      console.log("test");

      return [];
    }

    const enrollments = await Enrollment.find({
      studentId,
      status: EnrollStatus.COMPLETED,
    })
      .populate("courseId")
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const courses = enrollments.map((enrollment) => enrollment.courseId);

    return courses;
  }

  async getUnenrolledCourse(studentId?: string, page = 1, limit = 10) {
    if (!studentId || !Types.ObjectId.isValid(studentId)) {
      console.log("test");

      return [];
    }

    const enrollments = await Enrollment.find({ studentId }).select("courseId");

    const enrolledCourseIds = enrollments.map((e) => e.courseId);

    const unenrolledCourses = await Course.find({
      _id: { $nin: enrolledCourseIds },
    })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    return unenrolledCourses;
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

  async completedEnroll(data: CreateEnrollmentDto) {
    if (!Types.ObjectId.isValid(data.courseId)) {
      throw BaseError.BadRequest("Invalid course ID format.");
    }
    if (!Types.ObjectId.isValid(data.studentId)) {
      throw BaseError.BadRequest("Invalid student ID format.");
    }

    const student = await Enrollment.findOneAndUpdate(
      { studentId: data.studentId, courseId: data.courseId },
      { status: EnrollStatus.COMPLETED },
      { new: true }
    );

    if (!student) {
      throw BaseError.NotFoundError("Enrollment not found.");
    }

    return { message: "Enrollment completed successfully.", success: true };
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid ID format.");
    }

    const enroll = await Enrollment.findByIdAndDelete(id);

    if (!enroll) {
      throw BaseError.NotFoundError("enrollment not found.");
    }

    return { message: "Student deleted successfully.", success: true };
  }

  async deleteEnroll(studentId: string, courseId: string) {
    console.log("test");

    if (!Types.ObjectId.isValid(courseId)) {
      throw BaseError.BadRequest("Invalid course ID format.");
    }
    if (!Types.ObjectId.isValid(studentId)) {
      throw BaseError.BadRequest("Enroll student ID format.");
    }

    const enroll = await Enrollment.findOneAndDelete({ studentId, courseId });

    if (!enroll) {
      throw BaseError.NotFoundError("enrollment not found.");
    }

    return { message: "Enroll deleted successfully.", success: true };
  }
}

export default new StudentService();
