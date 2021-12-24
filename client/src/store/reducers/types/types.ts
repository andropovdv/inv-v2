import { IType } from "../../../models/IType";

export interface TypeState {
  types: IType[];
  typesDropdown: IType[];
  isLoading: boolean;
  error: string;
  selected: number[];
  count: number;
}

export enum TypeActionEnum {
  SET_TYPES = "SET_TYPES",
  SET_TYPES_IS_LOADING = "SET_TYPES_IS_LOADING",
  SET_TYPES_ERROR = "SET_TYPES_ERROR",
  SET_TYPES_SELECTED = "SET_TYPES_SELECTED",
  SET_TYPES_COUNT = "SET_TYPES_COUNT",
  SET_TYPES_DROPDOWN = "SET_TYPES_DROPDOWN",
  REMOVE_TYPES_DROPDOWN = "TYPES_DROPDOWN",
}

export interface SetTypesAction {
  type: TypeActionEnum.SET_TYPES;
  payload: IType[];
}

export interface SetTypesDropDownAction {
  type: TypeActionEnum.SET_TYPES_DROPDOWN;
  payload: IType[];
}

export interface RemoveTypesDropdown {
  type: TypeActionEnum.REMOVE_TYPES_DROPDOWN;
  payload: IType[];
}

export interface SetCountAction {
  type: TypeActionEnum.SET_TYPES_COUNT;
  payload: number;
}

export interface SetErrorAction {
  type: TypeActionEnum.SET_TYPES_ERROR;
  payload: string;
}

export interface SetIsLoadingAction {
  type: TypeActionEnum.SET_TYPES_IS_LOADING;
  payload: boolean;
}

export interface SetSelectedTypes {
  type: TypeActionEnum.SET_TYPES_SELECTED;
  payload: number[];
}

export type TypesAction =
  | SetTypesAction
  | SetCountAction
  | SetErrorAction
  | SetIsLoadingAction
  | SetSelectedTypes
  | SetTypesDropDownAction
  | RemoveTypesDropdown;
