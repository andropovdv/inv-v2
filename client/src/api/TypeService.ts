import { $authHost } from ".";
import { IOType, IType } from "./../models/IType";
import { AxiosResponse } from "axios";

export const TypeService = {
  async getTypes(
    page?: number,
    limit?: number
  ): Promise<AxiosResponse<IOType>> {
    return $authHost.get("/api/type/", { params: { page, limit } });
  },
  async addType(name: string, pref: string): Promise<AxiosResponse<IType[]>> {
    return $authHost.post("/api/type/add", { name, pref });
  },
  async updateType(type: IType): Promise<AxiosResponse<IType[]>> {
    return $authHost.put("/api/type/update", type);
  },
  async deleteType(ids: any): Promise<AxiosResponse<IType[]>> {
    return $authHost.post("/api/type/delete", ids);
  },
};
