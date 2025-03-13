import { Request, Response, NextFunction } from "express";
import courseService from "../services/course.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { handleValidationErrors } from "../validators/format";
import BaseError from "../utils/base.error";
import {
  CreateCourseDto,
  UpdateCourseDto,
} from "../validators/course.validator";

class CourseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const data = await courseService.getAll(page, limit);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await courseService.get(id);
      res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const courseData = plainToInstance(CreateCourseDto, req.body);

      const errors = await validate(courseData);

      if (errors.length > 0) {
        const formattedErrors = handleValidationErrors(errors);
        return next(BaseError.BadRequest("Error data.", formattedErrors));
      }

      const data = await courseService.create(courseData);
      res.status(201).json(data);
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const courseData = plainToInstance(UpdateCourseDto, req.body);
      const errors = await validate(courseData);

      if (errors.length > 0) {
        const formattedErrors = handleValidationErrors(errors);
        return next(BaseError.BadRequest("Error data.", formattedErrors));
      }

      const data = await courseService.update(courseData, id);
      res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await courseService.delete(id);
      res.json(data);
    } catch (error) {
      return next(error);
    }
  }
}

export default new CourseController();
