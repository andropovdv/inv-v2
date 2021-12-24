export interface IType {
  id: number;
  key?: number;
  name: string;
  pref?: any[];
}

export interface IOType {
  rows: IType[];
  count: number;
}
