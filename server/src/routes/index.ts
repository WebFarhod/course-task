import { Router } from "express";

import authRoute from "./auth.routes";
import courseRoute from "./course.routes";
import studentRoute from "./student.routes";
import enrollRoute from "./enrollment.routes";
import dashboardRoute from "./dashboard.routes";
import AuthMiddleware from "../middlewares/auth.middleware";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/course", courseRoute);
routes.use("/student", studentRoute);
routes.use("/enroll", enrollRoute);
routes.use("/dashboard", dashboardRoute);

export default routes;
