export interface IVendor {
  id: number;
  name: string;
  key?: number;
}

export interface IOVendor {
  rows: IVendor[];
  count: number;
}
