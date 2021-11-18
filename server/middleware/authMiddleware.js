import pkg from "jsonwebtoken";
import dotenv from "dotenv";

const { verify } = pkg;
dotenv.config();

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const decoded = verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Пользователь не авторизован" });
  }
};
