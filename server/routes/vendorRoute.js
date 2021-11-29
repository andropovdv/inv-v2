import { Router } from "express";
import vendorController from "../controllers/vendorController.js";

const router = Router();

router.get("/", vendorController.getVendors);
router.post("/add", vendorController.addVendors);
router.put("/update", vendorController.updateVendors);
router.post("/delete", vendorController.deleteVendors);

export default router;
