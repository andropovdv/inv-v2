import { DeviceService } from "../../../api/DeviceService";
import { IDevice, IODevice } from "../../../models/IDevice";
import { AppDispatch } from "./../../index";
import {
  DeviceActionEnum,
  SetCountAction,
  SetDevicesAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetSelectedAction,
} from "./types";

export const DeviceActionCreator = {
  setDevice: (devices: IODevice): SetDevicesAction => ({
    type: DeviceActionEnum.SET_DEVICES,
    payload: devices.rows,
  }),
  setCountDevice: (count: IODevice): SetCountAction => ({
    type: DeviceActionEnum.SET_DEVICES_COUNT,
    payload: count.count,
  }),
  setIsLoadingDevice: (payload: boolean): SetIsLoadingAction => ({
    type: DeviceActionEnum.SET_DEVICES_IS_LOADING,
    payload: payload,
  }),
  setErrorDevice: (error: string): SetErrorAction => ({
    type: DeviceActionEnum.SET_DEVICES_ERROR,
    payload: error,
  }),
  setSelectedDevice: (payload: number[]): SetSelectedAction => ({
    type: DeviceActionEnum.SET_DEVICES_SELECTED,
    payload: payload,
  }),
  getDevice:
    (page?: number, limit?: number) => async (dispatch: AppDispatch) => {
      try {
        dispatch(DeviceActionCreator.setIsLoadingDevice(true));
        const { data } = await DeviceService.getDevice(page, limit);
        if (data) {
          dispatch(DeviceActionCreator.setDevice(data));
        }
        if (data) {
          dispatch(DeviceActionCreator.setCountDevice(data));
        }
      } catch (e) {
        dispatch(DeviceActionCreator.setErrorDevice((e as Error).message));
      } finally {
        dispatch(DeviceActionCreator.setIsLoadingDevice(false));
      }
    },
  addDevice:
    (name: string, typeId: number, vendorId: number, info: string) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(DeviceActionCreator.setIsLoadingDevice(true));
        await DeviceService.addDevice(name, typeId, vendorId, info);
        dispatch<any>(DeviceActionCreator.getDevice());
      } catch (e) {
        dispatch(DeviceActionCreator.setErrorDevice((e as Error).message));
      } finally {
        dispatch(DeviceActionCreator.setIsLoadingDevice(false));
      }
    },
  deleteDevice: (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(DeviceActionCreator.setIsLoadingDevice(true));
      let payload = { id: ids };
      const { data } = await DeviceService.deleteDevice(payload);
      if (data) {
        dispatch(DeviceActionCreator.setSelectedDevice([]));
        dispatch<any>(DeviceActionCreator.getDevice(1));
      }
    } catch (e) {
      dispatch(DeviceActionCreator.setErrorDevice((e as Error).message));
    } finally {
      dispatch(DeviceActionCreator.setIsLoadingDevice(false));
    }
  },

  updateDevice:
    (id: number, name: string, info: any) => async (dispatch: AppDispatch) => {
      try {
        dispatch(DeviceActionCreator.setIsLoadingDevice(true));
        const { data } = await DeviceService.updateDevice(id, name, info);
        if (data) {
          await dispatch<any>(DeviceActionCreator.getDevice(1));
          dispatch(DeviceActionCreator.setSelectedDevice([]));
        } else {
          dispatch(DeviceActionCreator.setErrorDevice("Операция не удалась"));
        }
      } catch (e) {
        dispatch(DeviceActionCreator.setErrorDevice((e as Error).message));
      } finally {
        dispatch(DeviceActionCreator.setIsLoadingDevice(false));
      }
    },
};
