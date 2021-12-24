import { ValueState, ValueAction, ValuesActionEnum } from "./types";
import { IValue } from "../../../models/IValue";

const initialState: ValueState = {
  values: [] as IValue[],
  valuesField: [] as IValue[],
  isLoading: false,
  error: "",
  selected: [],
  count: 0,
};

const valueReducer = (
  state = initialState,
  action: ValueAction
): ValueState => {
  switch (action.type) {
    case ValuesActionEnum.SET_VALUES: {
      return { ...state, values: action.payload };
    }
    case ValuesActionEnum.SET_VALUES_FIELDS: {
      return { ...state, valuesField: action.payload };
    }
    case ValuesActionEnum.SET_VALUES_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case ValuesActionEnum.SET_VALUES_ERROR: {
      return { ...state, error: action.payload };
    }
    case ValuesActionEnum.SET_VALUES_SELECTED: {
      return { ...state, selected: action.payload };
    }
    case ValuesActionEnum.SET_VALUES_COUNT: {
      return { ...state, count: action.payload };
    }
    default:
      return state;
  }
};

export default valueReducer;
