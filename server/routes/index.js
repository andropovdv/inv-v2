import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import userRoute from "./userRoute.js";
import vendorRoute from "./vendorRoute.js";
import typeRoute from "./typeRoute.js";
import deviceRoute from "./deviceRoute.js";
import propertyRoute from "./propertyRoute.js";
import valuesRoute from "./valuesRoute.js";

const router = Router();

router.use("/user", userRoute);
router.use("/vendor", authMiddleware, vendorRoute);
router.use("/type", typeRoute);
router.use("/device", deviceRoute);
router.use("/property", propertyRoute);
router.use("/value", valuesRoute);

export default router;
