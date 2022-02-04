import { IDevice } from "../../../models/IDevice";

export interface DeviceState {
  devices: IDevice[];
  isLoading: boolean;
  error: string;
  selected: number[];
  count: number;
  currentPage: number;
}

export enum DeviceActionEnum {
  SET_DEVICES = "SET_DEVICES",
  SET_DEVICES_IS_LOADING = "SET_DEVICES_IS_LOADING",
  SET_DEVICES_ERROR = "SET_DEVICES_ERROR",
  SET_DEVICES_SELECTED = "SET_DEVICES_SELECTED",
  SET_DEVICES_COUNT = "SET_DEVICES_COUNT",
  SET_DEVICES_CURENNT_PAGE = "SET_DEVICES_CURENNT_PAGE",
}

export interface SetDevicesAction {
  type: DeviceActionEnum.SET_DEVICES;
  payload: IDevice[];
}

export interface SetCountAction {
  type: DeviceActionEnum.SET_DEVICES_COUNT;
  payload: number;
}

export interface SetErrorAction {
  type: DeviceActionEnum.SET_DEVICES_ERROR;
  payload: string;
}

export interface SetIsLoadingAction {
  type: DeviceActionEnum.SET_DEVICES_IS_LOADING;
  payload: boolean;
}

export interface SetSelectedAction {
  type: DeviceActionEnum.SET_DEVICES_SELECTED;
  payload: number[];
}

export interface SetDeviceCurrentPageAction {
  type: DeviceActionEnum.SET_DEVICES_CURENNT_PAGE;
  payload: number;
}

export type DeviceAction =
  | SetDevicesAction
  | SetCountAction
  | SetErrorAction
  | SetIsLoadingAction
  | SetSelectedAction
  | SetDeviceCurrentPageAction;
