import createError from "http-errors";
import { Vendor } from "../model/models.js";
import pk from "sequelize";
const { Op } = pk;

const vendorController = {
  async getVendors(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = +limit || 5;
      let offset = page * limit - limit;
      console.log("OFFSET: ", typeof limit);
      const vendors = await Vendor.findAndCountAll({ limit, offset });
      return res.json(vendors);
    } catch (e) {
      console.log(e);
      return next(new createError(500, "Что-то пошло не так"));
    }
  },
  async addVendors(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        return next(new createError(400, "Incorect date"));
      }
      const uni = await Vendor.findOne({ where: { name: name } });
      if (uni) {
        return next(
          new createError(400, `Производитель ${name} уже присутствует`)
        );
      }
      const result = await Vendor.create({ name });
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так ${e.message}`));
    }
  },
  async updateVendors(req, res, next) {
    const { id, name } = req.body;
    try {
      const result = await Vendor.update({ name }, { where: { id } });
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так ${e.message}`));
    }
  },
  async deleteVendors(req, res, next) {
    const { id } = req.body;
    try {
      const result = await Vendor.destroy({ where: { id: { [Op.in]: id } } });
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так ${e.message}`));
    }
  },
};

export default vendorController;
