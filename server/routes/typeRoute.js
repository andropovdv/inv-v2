import { Router } from "express";
import typeController from "../controllers/typeController.js";

const router = Router();

router.get("/", typeController.getTypes);
router.post("/add", typeController.addTypes);
router.put("/update", typeController.updateTypes);
router.post("/delete", typeController.deleteTypes);

export default router;
