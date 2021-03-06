export interface IProperty {
  id: number;
  preferense: string;
  type_preferense: string;
  unit?: string;
  key?: number;
}

export interface IOProperty {
  rows: IProperty[];
  count: number;
}
