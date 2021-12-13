import createError from "http-errors";
import { Device, Type, Vendor, DeviceInfo, TypeInfo } from "../model/models.js";
import colors from "colors";
import pk from "sequelize";
const { Op } = pk;

const deviceController = {
  // async getDevices(req, res, next) {
  //   try {
  //     let { limit, page } = req.query;
  //     page = page || 1;
  //     limit = +limit || 5;
  //     let offset = page * limit - limit;
  //     const devices = await Device.findAndCountAll({ limit, offset });
  //     return res.json(devices);
  //   } catch (e) {
  //     return next(new createError(500, "Что-то пошло не так"));
  //   }
  // },
  async getDevices(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = +limit || 5;
      let offset = page * limit - limit;
      const count = await Device.count();
      const devices = await Device.findAll({
        // const devices = await Device.findAndCountAll({
        include: [
          { model: Type, required: false, attributes: ["name"], as: "type" },
          { model: Vendor, required: false, attributes: ["name"] },
          {
            model: DeviceInfo,
            required: false,
            as: "info",
            attributes: ["title", "description"],
          },
        ],
        limit,
        offset,
      });
      return res.json({ count: count, rows: devices });
    } catch (e) {
      console.log(e);
      return next(new createError(500, `Errors: ${e.message}`));
    }
  },
  async addDevices(req, res, next) {
    console.log(colors.bgMagenta.black(req.body));
    try {
      let { name, vendorId, typeId, info } = req.body;
      if (!name) {
        return next(new createError(400, "Incorect date"));
      }
      const uni = await Device.findOne({ where: { name } });
      if (uni) {
        return next(
          new createError(400, `Производитель ${name} уже присутствует`)
        );
      }
      const result = await Device.create({ name, vendorId, typeId });
      if (info) {
        info = JSON.parse(info);
        info.forEach((el) => {
          DeviceInfo.create({
            title: el.title,
            description: el.desc,
            deviceId: result.id,
          });
        });
      }
      return res.json(result);
    } catch (e) {
      console.log(e);
      return next(new createError(500, `Что-то пошло не так ${e.message}`));
    }
  },
  async updateDevices(req, res, next) {},
  async deleteDevices(req, res, next) {
    const { id } = req.body;
    try {
      const result = await Device.destroy({ where: { id: { [Op.in]: id } } });
      return res.json(result);
    } catch (e) {
      return next(new createError(500, `Что-то пошло не так ${e.message}`));
    }
  },
};

export default deviceController;
