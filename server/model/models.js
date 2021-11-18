import sequelize from "./../db.js";
import pkg from "sequelize";
const { DataTypes } = pkg;

export const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});
