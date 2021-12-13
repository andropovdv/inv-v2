export interface IDevice {
  id?: number;
  name: string;
  info: any[];
  typeId?: number;
  vendorId?: number;
  type: typeName;
  vendor: typeName;
  nType: string;
  nVendor: string;
  key?: number;
}

export interface IODevice {
  rows: IDevice[];
  count: number;
}

type typeName = {
  name: string;
};
