import { TypeService } from "./../../../api/TypeService";
import { IOType, IType } from "../../../models/IType";
import { AppDispatch } from "./../../index";
import {
  SetCountAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetSelectedTypes,
  SetTypesAction,
  TypeActionEnum,
} from "./types";

export const TypeActionCreator = {
  setType: (type: IOType): SetTypesAction => ({
    type: TypeActionEnum.SET_TYPES,
    payload: type.rows,
  }),
  setCount: (count: IOType): SetCountAction => ({
    type: TypeActionEnum.SET_TYPES_COUNT,
    payload: count.count,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: TypeActionEnum.SET_TYPES_IS_LOADING,
    payload: payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: TypeActionEnum.SET_TYPES_ERROR,
    payload: payload,
  }),
  setSelectedTypes: (payload: number[]): SetSelectedTypes => ({
    type: TypeActionEnum.SET_TYPES_SELECTED,
    payload: payload,
  }),
  getType: (page?: number, limit?: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(TypeActionCreator.setIsLoading(true));
      const { data } = await TypeService.getTypes(page, limit);
      if (data.rows) {
        dispatch(TypeActionCreator.setType(data));
      }
      if (data.count) {
        dispatch(TypeActionCreator.setCount(data));
      }
    } catch (e) {
      dispatch(TypeActionCreator.setError((e as Error).message));
    } finally {
      dispatch(TypeActionCreator.setIsLoading(false));
    }
  },
  addType: (name: string, pref: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(TypeActionCreator.setIsLoading(true));
      await TypeService.addType(name, pref);
      dispatch<any>(TypeActionCreator.getType());
    } catch (e) {
      dispatch(TypeActionCreator.setError((e as Error).message));
    } finally {
      dispatch(TypeActionCreator.setIsLoading(false));
    }
  },
  deleteType: (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(TypeActionCreator.setIsLoading(true));
      let payload = { id: ids };
      const { data } = await TypeService.deleteType(payload);
      if (data) {
        dispatch(TypeActionCreator.setSelectedTypes([]));
        dispatch<any>(TypeActionCreator.getType(1));
      }
    } catch (e) {
      dispatch(TypeActionCreator.setError((e as Error).message));
    } finally {
      dispatch(TypeActionCreator.setIsLoading(false));
    }
  },
  updateType: (type: IType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(TypeActionCreator.setIsLoading(true));
      const { data } = await TypeService.updateType(type);
      if (data) {
        dispatch(TypeActionCreator.setSelectedTypes([]));
        dispatch<any>(TypeActionCreator.getType());
      }
    } catch (e) {
      dispatch(TypeActionCreator.setError((e as Error).message));
    } finally {
      dispatch(TypeActionCreator.setIsLoading(false));
    }
  },
};
