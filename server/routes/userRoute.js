import { Router } from "express";
import userController from "./../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.send(`<h1>User api</h1>`);
});
router.post("/registration", authMiddleware, userController.register);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);
router.get("/users", authMiddleware, userController.getUsers);
router.post("/delete", authMiddleware, userController.deleteUser);
router.post("/update", authMiddleware, userController.updateUser);

export default router;
