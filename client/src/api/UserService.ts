import { ISUser } from "./../models/IUser";
// import { IUser } from "../models/IUser";
import { AxiosResponse } from "axios";
import { $host, $authHost } from ".";

export const UserService = {
  async login(email: string, password: string): Promise<AxiosResponse> {
    return $host.post("api/user/login", { email, password });
  },
  async check(): Promise<AxiosResponse> {
    return $authHost.get("api/user/auth");
  },
  async getUsers(): Promise<AxiosResponse<ISUser[]>> {
    return $authHost.get("api/user/users");
  },
  async register(
    email: string,
    password: string,
    role: string,
    username: string
  ): Promise<AxiosResponse<ISUser[]>> {
    return $authHost.post("api/user/registration", {
      email,
      password,
      role,
      username,
    });
  },
};
