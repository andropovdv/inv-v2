import { IProperty } from "../../../models/IProperty";
import { PropertyState, PropertyAction, PropertyActionEnum } from "./types";

const initialState: PropertyState = {
  propertis: [] as IProperty[],
  propertisDropDown: [] as IProperty[],
  isLoading: false,
  error: "",
  selected: [],
  count: 0,
};

const propertyReducer = (
  state = initialState,
  action: PropertyAction
): PropertyState => {
  switch (action.type) {
    case PropertyActionEnum.SET_PROPERTIES: {
      return { ...state, propertis: action.payload };
    }
    case PropertyActionEnum.SET_PROPERTIES_DROPDOWN: {
      return {
        ...state,
        propertisDropDown: [...state.propertisDropDown, ...action.payload],
      };
    }
    case PropertyActionEnum.REMOVE_PROPERTIES_DROPDOWN: {
      return { ...state, propertisDropDown: action.payload };
    }
    case PropertyActionEnum.SET_PROPERTIES_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case PropertyActionEnum.SET_PROPERTIES_ERROR: {
      return { ...state, error: action.payload, isLoading: false };
    }
    case PropertyActionEnum.SET_PROPERTIES_SELECTED: {
      return { ...state, selected: action.payload };
    }
    case PropertyActionEnum.SET_PROPERTIES_COUNT: {
      return { ...state, count: action.payload };
    }
    default:
      return state;
  }
};

export default propertyReducer;
