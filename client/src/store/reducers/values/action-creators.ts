import { ValuesService } from "./../../../api/ValuesService";
import { AppDispatch } from "./../../index";
import {
  SetValueAction,
  ValuesActionEnum,
  SetValueCountAction,
  SetValueIsLoading,
  SetValueErrorAction,
  SetValueSelectedAction,
} from "./types";
import { IValue, IOValue } from "../../../models/IValue";

export const ValueActionCreator = {
  setValue: (values: IOValue): SetValueAction => ({
    type: ValuesActionEnum.SET_VALUES,
    payload: values.rows,
  }),
  setCountValue: (count: IOValue): SetValueCountAction => ({
    type: ValuesActionEnum.SET_VALUES_COUNT,
    payload: count.count,
  }),
  setIsLoadingValue: (payload: boolean): SetValueIsLoading => ({
    type: ValuesActionEnum.SET_VALUES_IS_LOADING,
    payload: payload,
  }),
  setErrorValue: (payload: string): SetValueErrorAction => ({
    type: ValuesActionEnum.SET_VALUES_ERROR,
    payload: payload,
  }),
  setSelectedValue: (payload: number[]): SetValueSelectedAction => ({
    type: ValuesActionEnum.SET_VALUES_SELECTED,
    payload: payload,
  }),
  getValue:
    (page?: number, limit?: number, typeId?: number) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(ValueActionCreator.setIsLoadingValue(true));
        const { data } = await ValuesService.getValue(page, limit);
        if (data) {
          dispatch(ValueActionCreator.setValue(data));
          dispatch(ValueActionCreator.setCountValue(data));
        }
      } catch (e) {
        dispatch(ValueActionCreator.setErrorValue((e as Error).message));
      } finally {
        dispatch(ValueActionCreator.setIsLoadingValue(false));
      }
    },
  addValue:
    (value: string, typeId: number, typeInfoId: number) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(ValueActionCreator.setIsLoadingValue(true));
        await ValuesService.addValue(value, typeId, typeInfoId);
        await dispatch<any>(ValueActionCreator.getValue(1));
      } catch (e) {
        dispatch(ValueActionCreator.setErrorValue((e as Error).message));
      } finally {
        dispatch(ValueActionCreator.setIsLoadingValue(false));
      }
    },
  deleteValue: (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ValueActionCreator.setIsLoadingValue(true));
      const payload = { id: ids };
      const { data } = await ValuesService.deleteValue(payload);
      if (data) {
        await dispatch<any>(ValueActionCreator.getValue(1));
        dispatch(ValueActionCreator.setSelectedValue([]));
      } else {
        dispatch(ValueActionCreator.setErrorValue("Операция не удалась"));
      }
    } catch (e) {
      dispatch(ValueActionCreator.setErrorValue((e as Error).message));
    } finally {
      dispatch(ValueActionCreator.setIsLoadingValue(false));
    }
  },
  updateValue: (value: IValue) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ValueActionCreator.setIsLoadingValue(true));
      const { data } = await ValuesService.updateValue(value);
      if (data) {
        await dispatch<any>(ValueActionCreator.getValue(1));
        dispatch(ValueActionCreator.setSelectedValue([]));
      } else {
        dispatch(ValueActionCreator.setErrorValue("Операция не удалась"));
      }
    } catch (e) {
      dispatch(ValueActionCreator.setErrorValue((e as Error).message));
    } finally {
      dispatch(ValueActionCreator.setIsLoadingValue(false));
    }
  },
};
