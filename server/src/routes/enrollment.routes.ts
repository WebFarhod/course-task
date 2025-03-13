import { Router } from "express";
import enrollmentController from "../controllers/enrollment.controller";

const router = Router();

router.get("/", enrollmentController.getAll);
router.post("/", enrollmentController.create);
router.put("/completed/:id", enrollmentController.completed);
router.delete("/:id", enrollmentController.delete);

export default router;
