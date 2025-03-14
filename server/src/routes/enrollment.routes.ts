import { Router } from "express";
import enrollmentController from "../controllers/enrollment.controller";

const router = Router();

router.get("/", enrollmentController.getAll);
router.get("/by-student", enrollmentController.getCourse);
router.get("/completed", enrollmentController.getCompletedCourse);
router.get("/unenrolled", enrollmentController.getUnenrolled);
router.post("/", enrollmentController.create);
router.put("/completed/:id", enrollmentController.completed);
router.put("/completed", enrollmentController.completedEnroll);
router.delete("/:id", enrollmentController.delete);
router.delete("/:studentId/:courseId", enrollmentController.deleteEnroll);

export default router;
