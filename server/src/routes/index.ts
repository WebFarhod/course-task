import { Router } from "express";

import authRoute from "./auth.routes";
import courseRoute from "./course.routes";
import studentRoute from "./student.routes";
import enrollRoute from "./enrollment.routes";
import dashboardRoute from "./dashboard.routes";
import AuthMiddleware from "../middlewares/auth.middleware";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/course", AuthMiddleware, courseRoute);
routes.use("/student", AuthMiddleware, studentRoute);
routes.use("/enroll", AuthMiddleware, enrollRoute);
routes.use("/dashboard", AuthMiddleware, dashboardRoute);

export default routes;
