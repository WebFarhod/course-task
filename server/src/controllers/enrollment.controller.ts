import { Request, Response, NextFunction } from "express";
import enrollmentService from "../services/enrollment.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { handleValidationErrors } from "../validators/format";
import BaseError from "../utils/base.error";
import { CreateEnrollmentDto } from "../validators/enrollment.validator";

class EnrollmentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = req.query.courseId as string | undefined;
      const studentId = req.query.studentId as string | undefined;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const data = await enrollmentService.getAll(
        courseId,
        studentId,
        page,
        limit
      );
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const enrollmentData = plainToInstance(CreateEnrollmentDto, req.body);

      const errors = await validate(enrollmentData);

      if (errors.length > 0) {
        const formattedErrors = handleValidationErrors(errors);
        return next(BaseError.BadRequest("Error data.", formattedErrors));
      }

      const data = await enrollmentService.create(enrollmentData);
      res.status(201).json(data);
    } catch (error) {
      return next(error);
    }
  }

  async completed(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await enrollmentService.completed(id);
      res.json(data);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await enrollmentService.delete(id);
      res.json(data);
    } catch (error) {
      return next(error);
    }
  }
}

export default new EnrollmentController();
