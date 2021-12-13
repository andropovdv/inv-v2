export interface IValue {
  id?: number;
  value: string;
  typeInfoId: number;
  typeId: number;
  type: type;
  type_info: typeInfo;
  nType: string;
  nTypeInfo: string;
  val?: any[];
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
  name: string;
};
