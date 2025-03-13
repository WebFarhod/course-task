import { Request, Response, NextFunction } from "express";
import dashboardService from "../services/dashboard.service";

class CourseController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.getDashboardData();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new CourseController();
