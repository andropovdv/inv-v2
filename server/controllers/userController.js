import bcrypt from "bcrypt";
import apiError from "./../error/apiError.js";
import { User } from "./../model/models.js";
import pkg from "jsonwebtoken";
import colors from "colors";

const { sign } = pkg;

import dotenv from "dotenv";
dotenv.config();

const generateJwt = (id, email, role, username) => {
  return sign({ id, email, role, username }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
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
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(apiError.internal("Пользователь  не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(apiError.internal("Неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  },
  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  },
  async getUsers(req, res) {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role", "createdAt", "updatedAt"],
    });
    return res.json(users);
  },
  async register(req, res) {
    console.log(colors.bgRed.black(req.body));
    const { email, password, username, role } = req.body;
    if (!email || !password || !username) {
      return next(apiError.badRequest("Incorrect data"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(apiError.badRequest("Already registered"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      username,
      role,
      password: hashPassword,
    });
    const token = generateJwt(user.id, user.email, user.username, user.role);
    return res.json({ token });
  },
};

export default userController;
