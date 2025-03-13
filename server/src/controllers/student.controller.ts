import { Request, Response, NextFunction } from "express";
import studentService from "../services/student.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { handleValidationErrors } from "../validators/format";
import BaseError from "../utils/base.error";
import {
  CreateStudentDto,
  UpdateStudentDto,
} from "../validators/student.validator";

class StudentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const data = await studentService.getAll(page, limit);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await studentService.get(id);
      res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const studentData = plainToInstance(CreateStudentDto, req.body);

      const errors = await validate(studentData);

      if (errors.length > 0) {
        const formattedErrors = handleValidationErrors(errors);
        return next(BaseError.BadRequest("Error data.", formattedErrors));
      }

      const data = await studentService.create(studentData);
      res.status(201).json(data);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const studentData = plainToInstance(UpdateStudentDto, req.body);
      const errors = await validate(studentData);

      if (errors.length > 0) {
        const formattedErrors = handleValidationErrors(errors);
        return next(BaseError.BadRequest("Error data.", formattedErrors));
      }

      const data = await studentService.update(studentData, id);
      res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await studentService.delete(id);
      res.json(data);
    } catch (error) {
      return next(error);
    }
  }
}

export default new StudentController();
