import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./routes";
import ErrorMiddleware from "./middlewares/error.middleware";

const app = express();

const corsOptions = {
  credentials: true,
  origin: [process.env.CLIENT_URL, "http://localhost:5173"],
};

app.use(
  cors({
    credentials: true,
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:5173",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  ErrorMiddleware(err, req, res, next);
});

export default app;
