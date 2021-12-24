import { IValue } from "../../../models/IValue";

export interface ValueState {
  values: IValue[];
  valuesField: IValue[];
  isLoading: boolean;
  error: string;
  selected: number[];
  count: number;
}

export enum ValuesActionEnum {
  SET_VALUES = "SET_VALUES",
  SET_VALUES_IS_LOADING = "SET_VALUES_IS_LOADING",
  SET_VALUES_ERROR = "SET_VALUES_ERROR",
  SET_VALUES_SELECTED = "SET_VALUES_SELECTED",
  SET_VALUES_COUNT = "SET_VALUES_COUNT",
  SET_VALUES_FIELDS = "SET_VALUES_FIELDS",
}

export interface SetValueAction {
  type: ValuesActionEnum.SET_VALUES;
  payload: IValue[];
}

export interface SetValueFieldsAction {
  type: ValuesActionEnum.SET_VALUES_FIELDS;
  payload: IValue[];
}

export interface SetValueCountAction {
  type: ValuesActionEnum.SET_VALUES_COUNT;
  payload: number;
}

export interface SetValueErrorAction {
  type: ValuesActionEnum.SET_VALUES_ERROR;
  payload: string;
}

export interface SetValueIsLoading {
  type: ValuesActionEnum.SET_VALUES_IS_LOADING;
  payload: boolean;
}

export interface SetValueSelectedAction {
  type: ValuesActionEnum.SET_VALUES_SELECTED;
  payload: number[];
}

export type ValueAction =
  | SetValueAction
  | SetValueCountAction
  | SetValueErrorAction
  | SetValueIsLoading
  | SetValueSelectedAction
  | SetValueFieldsAction;
