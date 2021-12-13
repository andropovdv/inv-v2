import { Router } from "express";
import valueController from "../controllers/valueController.js";

const router = Router();

router.get("/", valueController.getValue);
router.post("/add", valueController.addValue);
router.put("/update", valueController.updateValue);
router.post("/delete", valueController.daleteValue);

export default router;
