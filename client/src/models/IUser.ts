export interface IUser {
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface ISUser {
  id?: number;
  email: string;
  username: string;
  password: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  key?: number;
}
