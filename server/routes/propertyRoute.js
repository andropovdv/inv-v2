import { Router } from "express";
import propertyController from "../controllers/propertyController.js";

const router = Router();

router.get("/", propertyController.getProperty);
router.post("/add", propertyController.addProperty);
router.put("/update", propertyController.updateProperty);
router.post("/delete", propertyController.deleteProperty);

export default router;
