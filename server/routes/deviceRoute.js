import { Router } from "express";
import deviceController from "../controllers/deviceController.js";

const router = Router();

router.get("/", deviceController.getDevices);
router.post("/add", deviceController.addDevices);
router.put("/update", deviceController.updateDevices);
router.post("/delete", deviceController.deleteDevices);

export default router;
