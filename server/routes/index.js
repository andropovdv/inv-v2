import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import userRoute from "./userRoute.js";
import vendorRoute from "./vendorRoute.js";
const router = Router();

router.use("/user", userRoute);
router.use("/vendor", authMiddleware, vendorRoute);
router.use("/type", typeRoute);

export default router;
