import { IProperty, IOProperty } from "./../../../models/IProperty";
import { PropertyService } from "./../../../api/PropertyService";
import { AppDispatch } from "./../../index";
import {
  PropertyActionEnum,
  SetPropertyAction,
  SetPropertyCountAction,
  SetPropertyIsLoadingAction,
  SetPropertyErrorAction,
  SetPropertySelectedAction,
  SetPropertyDropDownAction,
  RemovePropertyDropDown,
  SetPropertyCurrentPageAction,
} from "./types";
import { pagination } from "../../../utils/consts";

export const PropertyActionCreator = {
  setProperty: (propertis: IOProperty): SetPropertyAction => ({
    type: PropertyActionEnum.SET_PROPERTIES,
    payload: propertis.rows,
  }),
  setPropertyDropdown: (property: IOProperty): SetPropertyDropDownAction => ({
    type: PropertyActionEnum.SET_PROPERTIES_DROPDOWN,
    payload: property.rows,
  }),
  removePropertyDropdown: (payload: IProperty[]): RemovePropertyDropDown => ({
    type: PropertyActionEnum.REMOVE_PROPERTIES_DROPDOWN,
    payload: payload,
  }),
  setCountProperty: (count: IOProperty): SetPropertyCountAction => ({
    type: PropertyActionEnum.SET_PROPERTIES_COUNT,
    payload: count.count,
  }),
  setIsLoadingProperty: (payload: boolean): SetPropertyIsLoadingAction => ({
    type: PropertyActionEnum.SET_PROPERTIES_IS_LOADING,
    payload: payload,
  }),
  setErrorProperty: (payload: string): SetPropertyErrorAction => ({
    type: PropertyActionEnum.SET_PROPERTIES_ERROR,
    payload: payload,
  }),
  setSelectedProperty: (payload: number[]): SetPropertySelectedAction => ({
    type: PropertyActionEnum.SET_PROPERTIES_SELECTED,
    payload: payload,
  }),
  setCurrentPageProperty: (payload: number): SetPropertyCurrentPageAction => ({
    type: PropertyActionEnum.SET_PROPERTIES_CURRENT_PAGE,
    payload: payload,
  }),
  getProperty:
    (page?: number, limit?: number) => async (dispatch: AppDispatch) => {
      try {
        dispatch(PropertyActionCreator.setIsLoadingProperty(true));
        const { data } = await PropertyService.getProperty(page, limit);
        if (data) {
          dispatch(PropertyActionCreator.setProperty(data));
          dispatch(PropertyActionCreator.setCountProperty(data));
        }
      } catch (e) {
        dispatch(PropertyActionCreator.setErrorProperty((e as Error).message));
      } finally {
        dispatch(PropertyActionCreator.setIsLoadingProperty(false));
      }
    },
  getPropertyDropdown:
    (page?: number, limit?: number) => async (dispatch: AppDispatch) => {
      try {
        dispatch(PropertyActionCreator.setIsLoadingProperty(true));
        const { data } = await PropertyService.getProperty(page, limit);
        if (data) {
          dispatch(PropertyActionCreator.setPropertyDropdown(data));
          dispatch(PropertyActionCreator.setCountProperty(data));
        }
      } catch (e) {
        dispatch(PropertyActionCreator.setErrorProperty((e as Error).message));
      } finally {
        dispatch(PropertyActionCreator.setIsLoadingProperty(false));
      }
    },
  addProperty:
    (name: string, type: string, unit?: string) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(PropertyActionCreator.setIsLoadingProperty(true));
        await PropertyService.addProperty(name, type, unit);
        await dispatch<any>(PropertyActionCreator.getProperty());
      } catch (e) {
        dispatch(PropertyActionCreator.setErrorProperty((e as Error).message));
      } finally {
        dispatch(PropertyActionCreator.setIsLoadingProperty(false));
      }
    },
  deleteProperty: (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(PropertyActionCreator.setIsLoadingProperty(true));
      const payload = { id: ids };
      const { data } = await PropertyService.deleteProperty(payload);
      if (data) {
        dispatch(PropertyActionCreator.setSelectedProperty([]));
        await dispatch<any>(PropertyActionCreator.getProperty());
      } else {
        dispatch(PropertyActionCreator.setErrorProperty("Операция не удалась"));
      }
    } catch (e) {
      dispatch(PropertyActionCreator.setErrorProperty((e as Error).message));
    } finally {
      dispatch(PropertyActionCreator.setIsLoadingProperty(false));
    }
  },
  updateProperty: (property: IProperty) => async (dispatch: AppDispatch) => {
    try {
      dispatch(PropertyActionCreator.setIsLoadingProperty(true));
      const { data } = await PropertyService.updateProperty(property);
      if (data) {
        await dispatch<any>(PropertyActionCreator.getProperty());
        dispatch(PropertyActionCreator.setSelectedProperty([]));
      }
    } catch (e) {
      dispatch(PropertyActionCreator.setErrorProperty((e as Error).message));
    } finally {
      dispatch(PropertyActionCreator.setIsLoadingProperty(false));
    }
  },
};
