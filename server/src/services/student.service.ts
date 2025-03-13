import { Types } from "mongoose";
import Student, { IStudent } from "../schemas/student.schema";
import BaseError from "../utils/base.error";
import SELECT from "../utils/select";
import {
  CreateStudentDto,
  UpdateStudentDto,
} from "../validators/student.validator";

class StudentService {
  async getAll(page = 1, limit = 10) {
    const students = await Student.find()
      .select(SELECT())
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    return students;
  }

  async get(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid ID format.");
    }

    const student = await Student.findById(id);
    if (!student) {
      throw BaseError.NotFoundError("Student not found.");
    }
    return student;
  }

  async create(data: CreateStudentDto): Promise<IStudent> {
    const existUser = await Student.findOne({ phone: data.phone });
    if (existUser) {
      throw BaseError.NotFoundError("Phone number already exists.");
    }
    const student = new Student(data);
    return await student.save();
  }

  async update(data: UpdateStudentDto, id: string): Promise<IStudent> {
    if (!Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid ID format.");
    }
    const student = await Student.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();

    if (!student) {
      throw BaseError.NotFoundError("Student not found.");
    }

    return student;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid ID format.");
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      throw BaseError.NotFoundError("Student not found.");
    }

    return { message: "Student deleted successfully.", success: true };
  }
}

export default new StudentService();
