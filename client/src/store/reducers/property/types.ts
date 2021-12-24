import { IProperty } from "../../../models/IProperty";

export interface PropertyState {
  propertis: IProperty[];
  propertisDropDown: IProperty[];
  isLoading: boolean;
  error: string;
  selected: number[];
  count: number;
}

export enum PropertyActionEnum {
  SET_PROPERTIES = "SET_PROPERTIES",
  SET_PROPERTIES_IS_LOADING = "SET_PROPERTIES_IS_LOADING",
  SET_PROPERTIES_ERROR = "SET_PROPERTIES_ERROR",
  SET_PROPERTIES_SELECTED = "SET_PROPERTIES_SELECTED",
  SET_PROPERTIES_COUNT = "SET_PROPERTIES_COUNT",
  SET_PROPERTIES_DROPDOWN = "SET_PROPERTIES_DROPDOWN",
  REMOVE_PROPERTIES_DROPDOWN = "REMOVE_PROPERTIES_DROPDOWN",
}

export interface SetPropertyAction {
  type: PropertyActionEnum.SET_PROPERTIES;
  payload: IProperty[];
}

export interface SetPropertyDropDownAction {
  type: PropertyActionEnum.SET_PROPERTIES_DROPDOWN;
  payload: IProperty[];
}

export interface RemovePropertyDropDown {
  type: PropertyActionEnum.REMOVE_PROPERTIES_DROPDOWN;
  payload: IProperty[];
}

export interface SetPropertyCountAction {
  type: PropertyActionEnum.SET_PROPERTIES_COUNT;
  payload: number;
}

export interface SetPropertyErrorAction {
  type: PropertyActionEnum.SET_PROPERTIES_ERROR;
  payload: string;
}

export interface SetPropertyIsLoadingAction {
  type: PropertyActionEnum.SET_PROPERTIES_IS_LOADING;
  payload: boolean;
}

export interface SetPropertySelectedAction {
  type: PropertyActionEnum.SET_PROPERTIES_SELECTED;
  payload: number[];
}

export type PropertyAction =
  | SetPropertyAction
  | SetPropertyCountAction
  | SetPropertyErrorAction
  | SetPropertyIsLoadingAction
  | SetPropertySelectedAction
  | SetPropertyDropDownAction
  | RemovePropertyDropDown;
