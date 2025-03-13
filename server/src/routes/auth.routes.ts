import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/login", authController.login);
router.get("/get-users", AuthMiddleware, authController.getUser);
router.get("/refresh", authController.refresh);

export default router;
