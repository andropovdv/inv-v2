import bcrypt from "bcrypt";
import apiError from "./../error/apiError.js";
import { User } from "./../model/models.js";
import pkg from "jsonwebtoken";

const { sign } = pkg;

import dotenv from "dotenv";
dotenv.config();

const generateJwt = (id, email, role) => {
  return sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

const userController = {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(apiError.badRequest("Некоректный email или password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(apiError.badRequest("Уже существует"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  },
  async login() {},
  async check() {},
};

export default userController;
