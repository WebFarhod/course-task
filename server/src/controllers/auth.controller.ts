import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import AuthService from "../services/auth.service";
import { RegisterUserDto } from "../validators/register.validator";
import BaseError from "../utils/base.error";
import { handleValidationErrors } from "../validators/format";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(BaseError.BadRequest("Invalid parametrs"));
    }
    try {
      const data = await AuthService.login(email, password);
      res.cookie("refresh_token", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (user) {
        const data = await AuthService.getUser(user);
        res.json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token } = req.cookies;
      const data = await AuthService.refresh(refresh_token);
      //   res.cookie("refreshToken", data.refreshToken, {
      //     httpOnly: true,
      //     maxAge: 30 * 24 * 60 * 60 * 1000,
      //   });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
