import createError from "http-errors";
import { TypeInfo } from "../model/models.js";
import pk from "sequelize";
const { Op } = pk;

const propertyController = {
  async getProperty(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = +limit || 5;
      let offset = page * limit - limit;
      const result = await TypeInfo.findAndCountAll({ limit, offset });
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так ( ${e.message} )`));
    }
  },
  async addProperty(req, res, next) {
    try {
      const { name, type, unit } = req.body;
      if (!name && !type_preferense) {
        return next(new createError(400, "Incorect date"));
      }
      const uni = await TypeInfo.findOne({ where: { preferense: name } });
      if (uni) {
        return next(
          new createError(400, `Характеристика ${name} уже присутствует`)
        );
      }
      const result = await TypeInfo.create({
        preferense: name,
        type_preferense: type,
        unit: unit,
      });
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так ${e.message}`));
    }
  },
  async updateProperty(req, res, next) {
    const { id, preferense, type_preferense, unit } = req.body;
    try {
      const result = await TypeInfo.update(
        { preferense, type_preferense, unit },
        { where: { id } }
      );
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так ${e.message}`));
    }
  },
  async deleteProperty(req, res, next) {
    const { id } = req.body;
    try {
      const result = await TypeInfo.destroy({ where: { id: { [Op.in]: id } } });
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так, ${e.message} `));
    }
  },
};

export default propertyController;
