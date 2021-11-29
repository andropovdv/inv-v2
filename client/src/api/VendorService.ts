import { $authHost } from ".";
import { AxiosResponse } from "axios";
import { IOVendor, IVendor } from "../models/IVendor";

export const VendorService = {
  async getVendor(
    page?: number,
    limit?: number
  ): Promise<AxiosResponse<IOVendor>> {
    return $authHost.get("/api/vendor/", { params: { page, limit } });
  },
  async addVendor(name: string): Promise<AxiosResponse<IVendor[]>> {
    return $authHost.post("/api/vendor/add", { name });
  },
  async updateVendor(vendor: IVendor): Promise<AxiosResponse<IVendor[]>> {
    return $authHost.put("/api/vendor/update", vendor);
  },
  async deleteVendor(ids: any): Promise<AxiosResponse<IVendor[]>> {
    return $authHost.post("/api/vendor/delete", ids);
  },
};
