import { Router } from "express";
import studentController from "../controllers/student.controller";

const router = Router();

router.get("/:id", studentController.get);
router.get("/", studentController.getAll);
router.post("", studentController.create);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.delete);

export default router;
