import { Types } from "mongoose";
import Course, { ICourse } from "../schemas/course.schema";
import BaseError from "../utils/base.error";
import SELECT from "../utils/select";
import {
  CreateCourseDto,
  UpdateCourseDto,
} from "../validators/course.validator";

class CourseService {
  async getAll(page = 1, limit = 10) {
    const courses = await Course.find()
      .select(SELECT())
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    return courses;
  }

  async get(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid ID format.");
    }

    const course = await Course.findById(id);
    if (!course) {
      throw BaseError.NotFoundError("Course not found.");
    }
    return course;
  }

  async create(data: CreateCourseDto): Promise<ICourse> {
    const course = new Course(data);
    return await course.save();
  }

  async update(data: UpdateCourseDto, id: string): Promise<ICourse> {
    if (!Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid ID format.");
    }
    const course = await Course.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();

    if (!course) {
      throw BaseError.NotFoundError("Course not found.");
    }

    return course;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid ID format.");
    }

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      throw BaseError.NotFoundError("Course not found.");
    }

    return { message: "Course deleted successfully.", success: true };
  }
}

export default new CourseService();
