import createError from "http-errors";
import pk from "sequelize";
import { TableValue, Type, TypeInfo } from "../model/models.js";
const { Op } = pk;

const valueController = {
  async getValue(req, res, next) {
    try {
      let { limit, page, typeId } = req.query;
      page = page || 1;
      limit = +limit || 5;
      let offset = page * limit - limit;
      let count;
      let result;
      if (!typeId) {
        count = await TableValue.count();
        result = await TableValue.findAll({
          include: [
            {
              model: Type,
              required: false,
            },
            {
              model: TypeInfo,
              required: false,
            },
          ],
          limit,
          offset,
        });
      }
      if (typeId) {
        result = await TableValue.findAll({ typeId });
      }

      return res.json({ count: count, rows: result });
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так. ${e.message}`));
    }
  },
  async addValue(req, res, next) {
    try {
      const { value, typeId, typeInfoId } = req.body;
      if (!value && !typeId && !typeInfoId) {
        return next(new createError(400, "Incorect data"));
      }
      const uni = await TableValue.findOne({ where: { value, typeId } });
      if (uni) {
        return next(
          new createError(
            400,
            `Значение ${value} в типе ${typeId} уже присутствует`
          )
        );
      }
      const result = await TableValue.create({ value, typeId, typeInfoId });
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так. ${e.message}`));
    }
  },
  async updateValue(req, res, next) {
    try {
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так. ${e.message}`));
    }
  },
  async daleteValue(req, res, next) {
    try {
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так. ${e.message}`));
    }
  },
};

export default valueController;
