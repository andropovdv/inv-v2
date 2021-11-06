import { Router } from "express";
import userController from "./../controllers/userController.js";

const router = Router();

router.get("/", (req, res) => {
  res.send(`<h1>User api</h1>`);
});
router.post("/registration", userController.registration);

export default router;
