import { $authHost } from ".";
import { IOProperty, IProperty } from "./../models/IProperty";
import { AxiosResponse } from "axios";

export const PropertyService = {
  async getProperty(
    page?: number,
    limit?: number
  ): Promise<AxiosResponse<IOProperty>> {
    return $authHost.get("/api/property/", { params: { page, limit } });
  },
  async addProperty(
    name: string,
    type: string
  ): Promise<AxiosResponse<IOProperty>> {
    return $authHost.post("/api/property/add", { name, type });
  },
  async updateProperty(
    property: IProperty
  ): Promise<AxiosResponse<IOProperty>> {
    return $authHost.put("/api/property/update", property);
  },
  async deleteProperty(ids: any): Promise<AxiosResponse<IOProperty>> {
    return $authHost.post("/api/property/delete", ids);
  },
};
