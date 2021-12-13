import { IType } from "./../../../models/IType";
import { TypeActionEnum, TypesAction, TypeState } from "./types";

const initialState: TypeState = {
  types: [] as IType[],
  isLoading: false,
  error: "",
  selected: [],
  count: 0,
};

const typeReduser = (state = initialState, action: TypesAction): TypeState => {
  switch (action.type) {
    case TypeActionEnum.SET_TYPES: {
      return { ...state, types: action.payload };
    }
    case TypeActionEnum.SET_TYPES_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case TypeActionEnum.SET_TYPES_ERROR: {
      return { ...state, error: action.payload };
    }
    case TypeActionEnum.SET_TYPES_SELECTED: {
      return { ...state, selected: action.payload };
    }
    case TypeActionEnum.SET_TYPES_COUNT: {
      return { ...state, count: action.payload };
    }
    default:
      return state;
  }
};

export default typeReduser;
