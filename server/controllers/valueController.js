import createError from "http-errors";
import colors from "colors";
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
      let uniCount;
      if (!typeId) {
        count = await Type.count();

        result = await Type.findAll({
          include: [
            {
              model: TableValue,
              as: "tableValue",
              include: [{ model: TypeInfo }],
            },
          ],
        });
        // result = await TableValue.findAll({
        //   include: [
        //     {
        //       model: Type,
        //       required: false,
        //     },
        //     {
        //       model: TypeInfo,
        //       required: false,
        //     },
        //   ],
        //   limit,
        //   offset,
        // });
      }
      if (typeId) {
        const type = Number(typeId);
        result = await TableValue.findAll({
          attributes: ["id", "typeInfoId", "value"],
          where: { typeId: type },
          include: [
            { model: Type, required: false, attributes: ["id", "name"] },
            {
              model: TypeInfo,
              required: false,
              attributes: ["id", "preferense", "type_preferense"],
            },
          ],
        });
      }

      return res.json({ count: count, rows: result });
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так. ${e.message}`));
    }
  },
  async addValue(req, res, next) {
    try {
      let { value, typeId, typeInfoId } = req.body.payload;
      if (!value && !typeId && !typeInfoId) {
        return next(new createError(400, `Incorect data: ${req.body}`));
      }
      if (value === undefined) {
        value = "";
      }
      const uni = await TableValue.findOne({
        where: { typeId, typeInfoId },
      });
      console.log("uni:", uni);
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
      const { value, typeId, typeInfoId, id } = req.body;
      if (value === undefined) {
        value = "";
      }
      const result = await TableValue.update(
        { value, typeId, typeInfoId },
        { where: { id } }
      );
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так. ${e.message}`));
    }
  },
  async daleteValue(req, res, next) {
    const { id } = req.body;
    try {
      const result = await TableValue.destroy({
        where: { id: { [Op.in]: id } },
      });
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так. ${e.message}`));
    }
  },
};

export default valueController;
