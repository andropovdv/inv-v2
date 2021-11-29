import { IVendor } from "../../../models/IVendor";

export interface VendorState {
  vendors: IVendor[];
  isLoading: boolean;
  error: string;
  selected: number[];
  count: number;
}

export enum VendorActionEnum {
  SET_VENDORS = "SET_VENDORS",
  SET_VENDORS_IS_LOADING = "SET_VENDORS_IS_LOADING",
  SET_VENDORS_ERROR = "SET_VENDORS_ERROR",
  SET_VENDORS_SELECTED = "SET_VENDORS_SELECTED",
  SET_VENDORS_COUNT = "SET_VENDORS_COUNT",
}

export interface SetVendorsAction {
  type: VendorActionEnum.SET_VENDORS;
  payload: IVendor[];
}

export interface SetCountAction {
  type: VendorActionEnum.SET_VENDORS_COUNT;
  payload: number;
}

export interface SetErrorAction {
  type: VendorActionEnum.SET_VENDORS_ERROR;
  payload: string;
}

export interface SetIsLoadingAction {
  type: VendorActionEnum.SET_VENDORS_IS_LOADING;
  payload: boolean;
}

export interface SetSelectedVendors {
  type: VendorActionEnum.SET_VENDORS_SELECTED;
  payload: number[];
}

export type VendorsAction =
  | SetVendorsAction
  | SetErrorAction
  | SetIsLoadingAction
  | SetSelectedVendors
  | SetCountAction;
