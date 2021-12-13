import { IDevice } from "./../models/IDevice";
import { AxiosResponse } from "axios";
import { $authHost } from ".";
import { IODevice } from "../models/IDevice";
export const DeviceService = {
  async getDevice(
    page?: number,
    limit?: number
  ): Promise<AxiosResponse<IODevice>> {
    return $authHost.get("/api/device/", { params: { page, limit } });
  },
  async addDevice(
    name: string,
    typeId: number,
    vendorId: number,
    info: string
  ): Promise<AxiosResponse<IDevice[]>> {
    console.log(name, typeId, vendorId, info);
    return $authHost.post("/api/device/add", { name, typeId, vendorId, info });
  },
  async updateDevice() {},
  async deleteDevice(ids: any): Promise<AxiosResponse<IDevice>> {
    return $authHost.post("/api/device/delete", ids);
  },
};
