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
  setFieldValue: (field: any) => ({
    type: ValuesActionEnum.SET_VALUES_FIELDS,
    payload: field,
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
        const { data } = await ValuesService.getValue(page, limit, typeId);

        if (data) {
          if (typeId) {
            const map: any = data.rows.reduce((acc: any, cur: any) => {
              acc[cur.typeInfoId] = acc[cur.typeInfoId] || {
                id: cur.typeInfoId,
                propOne: "",
                propType: "",
                val: [],
                unit: cur.type_info.unit,
              };
              acc[cur.typeInfoId].propOne = cur.type_info.preferense;
              acc[cur.typeInfoId].propType = cur.type_info.type_preferense;
              acc[cur.typeInfoId].val.push(cur.value);
              return acc;
            }, {});
            const result: any = Object.values(map);
            dispatch<any>(ValueActionCreator.setFieldValue(result));
          } else {
            dispatch(ValueActionCreator.setValue(data));
            dispatch(ValueActionCreator.setCountValue(data));
          }
        }
      } catch (e) {
        dispatch(ValueActionCreator.setErrorValue((e as Error).message));
      } finally {
        dispatch(ValueActionCreator.setIsLoadingValue(false));
      }
    },
  addValue: (payload: IValue) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ValueActionCreator.setIsLoadingValue(true));
      await ValuesService.addValue(payload);
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
