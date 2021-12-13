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

export const Vendor = sequelize.define("vendor", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export const TypeInfo = sequelize.define("type_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  preferense: { type: DataTypes.STRING, allowNull: false },
  type_preferense: { type: DataTypes.STRING, allowNull: false },
});

export const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

export const TableValue = sequelize.define("table_value", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, unique: true, allowNull: false },
});

TypeInfo.hasMany(TableValue);
TableValue.belongsTo(TypeInfo);

Type.hasMany(TableValue);
TableValue.belongsTo(Type);

Type.hasMany(Device);
Device.belongsTo(Type);

Vendor.hasMany(Device);
Device.belongsTo(Vendor);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

// Type.hasMany(TypeInfo, { as: "pref" });
// TypeInfo.belongsTo(Type);
