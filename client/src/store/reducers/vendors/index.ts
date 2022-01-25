import { IVendor } from "../../../models/IVendor";
import { VendorState, VendorsAction, VendorActionEnum } from "./types";

const initialState: VendorState = {
  vendors: [] as IVendor[],
  vendorsDropDown: [] as IVendor[],
  isLoading: false,
  error: "",
  selected: [],
  count: 0,
};

const vendorReducer = (
  state = initialState,
  action: VendorsAction
): VendorState => {
  switch (action.type) {
    case VendorActionEnum.SET_VENDORS: {
      return { ...state, vendors: action.payload };
    }
    case VendorActionEnum.SET_VENDORS_DROPDOWN: {
      return {
        ...state,
        vendorsDropDown: [...state.vendorsDropDown, ...action.payload],
      };
    }
    case VendorActionEnum.REMOVE_VENDORS_DROPDOWN: {
      return { ...state, vendorsDropDown: action.payload };
    }
    case VendorActionEnum.SET_VENDORS_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case VendorActionEnum.SET_VENDORS_ERROR: {
      return { ...state, error: action.payload, isLoading: false };
    }
    case VendorActionEnum.SET_VENDORS_SELECTED: {
      return { ...state, selected: action.payload };
    }
    case VendorActionEnum.SET_VENDORS_COUNT: {
      return { ...state, count: action.payload };
    }
    default:
      return state;
  }
};

export default vendorReducer;
