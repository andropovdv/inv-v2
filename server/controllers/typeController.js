import createError from "http-errors";
import { Type, TypeInfo } from "../model/models.js";
import pk from "sequelize";
import errorMessage from "../utils/errorMessage.js";
const { Op } = pk;

const typeController = {
  async getTypes(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = +limit || 5;
      let offset = page * limit - limit;
      const count = await Type.count();
      const types = await Type.findAll({
        limit,
        offset,
      });
      return res.json({ count: count, rows: types });
    } catch (e) {
      return next(new createError(500, `Error: ${e.message}`));
    }
  },
  async addTypes(req, res, next) {
    try {
      let { name, pref } = req.body;
      if (!name) {
        return next(new createError(400, "Incorect date"));
      }
      const unical = await Type.findOne({ where: { name: name } });
      if (unical) {
        return next(
          new createError(400, `Производитель ${name} уже присутствует`)
        );
      }
      const result = await Type.create({ name: name });
      if (pref) {
        pref = JSON.parse(pref);
        pref.forEach((el) => {
          TypeInfo.create({
            preferense: el.preferense,
            type_preferense: el.type_preferense,
            typeId: result.id,
          });
        });
      }
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так ${e.message}`));
    }
  },
  async updateTypes(req, res, next) {
    const { id, name } = req.body;
    try {
      if (!name && !id) {
        return next(new createError(400, "Incorect date"));
      }
      const result = await Type.update({ name }, { where: { id } });
      return res.json(result);
    } catch (e) {
      return next(new createError(500, errorMessage(e)));
      // return next(new createError(500, `Что-то пошло не так ${e.message}`));
    }
  },
  async deleteTypes(req, res, next) {
    const { id } = req.body;
    try {
      const result = await Type.destroy({ where: { id: { [Op.in]: id } } });
      return res.json({ result });
    } catch (e) {
      return next(new createError(500, errorMessage(e)));
      // return next(
      //   new createError(500, `DELETE: что-то пошло не так ${e.name}`)
      // );
    }
  },
};

export default typeController;
