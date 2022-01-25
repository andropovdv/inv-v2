import { IVendor } from "../../../models/IVendor";

export interface VendorState {
  vendors: IVendor[];
  vendorsDropDown: IVendor[];
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
  SET_VENDORS_DROPDOWN = "SET_VENDORS_DROPDOWN",
  REMOVE_VENDORS_DROPDOWN = "REMOVE_VENDORS_DROPDOWN",
}

export interface SetVendorsAction {
  type: VendorActionEnum.SET_VENDORS;
  payload: IVendor[];
}

export interface SetVendorsDropDownAction {
  type: VendorActionEnum.SET_VENDORS_DROPDOWN;
  payload: IVendor[];
}

export interface RemoveVendorsDropDownAction {
  type: VendorActionEnum.REMOVE_VENDORS_DROPDOWN;
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
  | SetCountAction
  | SetVendorsDropDownAction
  | RemoveVendorsDropDownAction;
