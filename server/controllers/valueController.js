import createError from "http-errors";
import colors from "colors";
import pk from "sequelize";
import {
  Device,
  DeviceInfo,
  TableValue,
  Type,
  TypeInfo,
} from "../model/models.js";
import sequelize from "./../db.js";
const { Op, QueryTypes } = pk;

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
              attributes: ["id", "preferense", "type_preferense", "unit"],
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
        where: { typeInfoId, value },
      });
      if (uni) {
        const typeInfo = await TypeInfo.findOne({ where: { id: typeInfoId } });
        return next(
          new createError(
            400,
            `Значение ${value} в характеристике ${typeInfo.preferense} уже присутствует`
          )
        );
      }
      const result = await TableValue.create({ value, typeId, typeInfoId });

      // выясняем id устройтст для которых необходима коррекция
      const add1 = await sequelize.query(
        "select DISTINCT deviceId from device_infos where deviceId IN (select id from devices where typeId = :typeIds)",
        {
          replacements: { typeIds: typeId },
          type: QueryTypes.SELECT,
        }
      );
      const add15 = await TypeInfo.findOne({
        where: { id: typeInfoId },
        raw: true,
        attributes: ["preferense"],
      });
      console.log(colors.bgGreen.black("typeInfo:", add15));
      for (const el of add1) {
        // проверяем наличие характеристики
        const add2 = await sequelize.query(
          "select count(*) as uni from device_infos where title= :val and deviceId= :id",
          {
            replacements: { id: el.deviceId, val: add15.preferense },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        // если нет такой характеристики добавляем
        if (add2[0].uni === 0) {
          const up = await TypeInfo.findOne({
            where: { id: typeInfoId },
            attributes: ["preferense"],
            raw: true,
          });

          await DeviceInfo.create({
            title: up.preferense,
            description: null,
            deviceId: el.deviceId,
          });
        }
      }
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
      const prevVal = await TableValue.findOne({
        where: { id: id },
        attributes: ["value"],
        raw: true,
      });
      console.log(
        colors.bgMagenta.black("Предыдущееновое значения:", prevVal, value)
      );
      const upd1 = await TypeInfo.findOne({
        where: { id: typeInfoId },
        attributes: ["preferense"],
        raw: true,
      });
      console.log(colors.bgMagenta.black("TypePreferense:", upd1));
      const upd2 = await Device.findAll({
        where: { typeId: typeId },
        attributes: ["id"],
        raw: true,
      });
      console.log(colors.bgMagenta.black("DeviceId to update", upd2));

      for (const el of upd2) {
        const upd3 = await DeviceInfo.findOne({
          where: {
            deviceId: el.id,
            title: upd1.preferense,
            description: prevVal.value,
          },
          attributes: ["id"],
          raw: true,
        });
        console.log(colors.bgMagenta.black("update", upd3));
        if (upd3 !== null) {
          const upd4 = await DeviceInfo.update(
            { title: upd1.preferense, description: value },
            { where: { id: upd3.id } }
          );
          console.log(colors.bgMagenta.black("result", upd4));
        }
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
      // определяем тип оборудования
      const del1 = await TableValue.findAll({
        where: { id: { [Op.in]: id } },
        attributes: ["typeId", "typeInfoId"],
        raw: true,
      });
      // получаем typenfo.prefirense по id
      const del2 = await TypeInfo.findOne({
        where: { id: del1[0].typeInfoId },
        raw: true,
        attributes: ["preferense"],
      });
      // получаем deviceId по typeId
      const del3 = await Device.findAll({
        where: { typeId: del1[0].typeId },
        attributes: ["id"],
        raw: true,
      });
      // удаляем из device_info строки
      for (const el of del3) {
        const del4 = await DeviceInfo.destroy({
          where: { deviceId: el.id, title: del2.preferense },
        });
      }

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
