import { IOVendor } from "./../../../models/IVendor";
import { AppDispatch } from "./../../index";
import {
  SetVendorsAction,
  VendorActionEnum,
  SetIsLoadingAction,
  SetErrorAction,
  SetSelectedVendors,
  SetCountAction,
} from "./types";
import { IVendor } from "../../../models/IVendor";
import { VendorService } from "../../../api/VendorService";

export const VendorActionCreator = {
  setVendor: (vendors: IOVendor): SetVendorsAction => ({
    type: VendorActionEnum.SET_VENDORS,
    payload: vendors.rows,
  }),
  setCount: (count: IOVendor): SetCountAction => ({
    type: VendorActionEnum.SET_VENDORS_COUNT,
    payload: count.count,
  }),
  // setVendor: (vendors: IVendor[]): SetVendorsAction => ({
  //   type: VendorActionEnum.SET_VENDORS,
  //   payload: vendors,
  // }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: VendorActionEnum.SET_VENDORS_IS_LOADING,
    payload: payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: VendorActionEnum.SET_VENDORS_ERROR,
    payload: payload,
  }),
  setSelectedVendor: (payload: number[]): SetSelectedVendors => ({
    type: VendorActionEnum.SET_VENDORS_SELECTED,
    payload: payload,
  }),
  getVendor:
    (page?: number, limit?: number) => async (dispatch: AppDispatch) => {
      try {
        dispatch(VendorActionCreator.setIsLoading(true));
        const { data } = await VendorService.getVendor(page, limit);
        if (data.rows) {
          dispatch(VendorActionCreator.setVendor(data));
        }
        if (data.count) {
          dispatch(VendorActionCreator.setCount(data));
        }
      } catch (e) {
        dispatch(VendorActionCreator.setError((e as Error).message));
      } finally {
        dispatch(VendorActionCreator.setIsLoading(false));
      }
    },
  addVendor: (name: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(VendorActionCreator.setIsLoading(true));
      await VendorService.addVendor(name);
      dispatch<any>(VendorActionCreator.getVendor());
    } catch (e) {
      dispatch(VendorActionCreator.setError((e as Error).message));
    } finally {
      dispatch(VendorActionCreator.setIsLoading(false));
    }
  },
  deleteVendor: (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(VendorActionCreator.setIsLoading(true));
      let payload = { id: ids };
      const { data } = await VendorService.deleteVendor(payload);
      if (data) {
        dispatch(VendorActionCreator.setSelectedVendor([]));
        dispatch<any>(VendorActionCreator.getVendor(1));
      }
    } catch (e) {
      dispatch(VendorActionCreator.setError((e as Error).message));
    } finally {
      dispatch(VendorActionCreator.setIsLoading(false));
    }
  },
  updateVendor: (vendor: IVendor) => async (dispatch: AppDispatch) => {
    try {
      dispatch(VendorActionCreator.setIsLoading(true));
      const { data } = await VendorService.updateVendor(vendor);
      if (data) {
        dispatch<any>(VendorActionCreator.getVendor(1));
        dispatch(VendorActionCreator.setSelectedVendor([]));
      }
    } catch (e) {
      dispatch(VendorActionCreator.setError((e as Error).message));
    } finally {
      dispatch(VendorActionCreator.setIsLoading(false));
    }
  },
};
