import { $authHost } from ".";
import { IValue, IOValue } from "../models/IValue";
import { AxiosResponse } from "axios";

export const ValuesService = {
  async getValue(
    page?: number,
    limit?: number,
    typeId?: number
  ): Promise<AxiosResponse<IOValue>> {
    return $authHost.get("/api/value/", { params: { page, limit, typeId } });
  },
  async addValue(payload: IValue): Promise<AxiosResponse<IOValue>> {
    return $authHost.post("/api/value/add", { payload });
  },
  async updateValue(value: IValue): Promise<AxiosResponse<IValue>> {
    return $authHost.put("/api/value/update", value);
  },
  async deleteValue(ids: any): Promise<AxiosResponse<IValue>> {
    return $authHost.post("/api/value/delete", ids);
  },
};
