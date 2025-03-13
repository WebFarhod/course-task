import { Router } from "express";
import courseController from "../controllers/course.controller";

const router = Router();

router.get("/:id", courseController.get);
router.get("/", courseController.getAll);
router.post("", courseController.create);
router.put("", courseController.update);
router.delete("/:id", courseController.delete);

export default router;
