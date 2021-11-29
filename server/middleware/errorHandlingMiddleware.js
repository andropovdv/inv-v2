import apiError from "../error/apiError.js";

export default (req, res, err) => {
  if (err instanceof apiError) {
    return res.json({ message: err.message });
    // return res.status(err.status).json({ message: err.message });
  }
  return res.json({ message: "Непредвиденная ошибка" });
};
