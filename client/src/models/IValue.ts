export interface IValue {
  id?: number;
  key?: number;
  name: string;
  tableValue: type[];
  typeId?: number;
  typeInfoId?: number;
}

export interface IOValue {
  rows: IValue[];
  count: number;
}

type typeInfo = {
  id?: number;
  preferense: string;
  type_preferense: string;
};

type type = {
  id?: number;
  value?: string;
  typeId: number;
  typeInfoId: number;
  type_info: typeInfo;
};
