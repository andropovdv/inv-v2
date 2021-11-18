import apiError from "../error/apiError.js";

export default (req, res, err) => {
  if (err instanceof apiError) {
    return res.status(err.status).json({ message: err.messge });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
