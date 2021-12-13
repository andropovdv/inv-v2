import { IDevice } from "./../../../models/IDevice";
import { DeviceAction, DeviceActionEnum, DeviceState } from "./types";

const initialState: DeviceState = {
  devices: [] as IDevice[],
  isLoading: false,
  error: "",
  selected: [],
  count: 0,
};

const deviceReducer = (
  state = initialState,
  action: DeviceAction
): DeviceState => {
  switch (action.type) {
    case DeviceActionEnum.SET_DEVICES: {
      return { ...state, devices: action.payload };
    }
    case DeviceActionEnum.SET_DEVICES_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case DeviceActionEnum.SET_DEVICES_ERROR: {
      return { ...state, error: action.payload, isLoading: false };
    }
    case DeviceActionEnum.SET_DEVICES_SELECTED: {
      return { ...state, selected: action.payload };
    }
    case DeviceActionEnum.SET_DEVICES_COUNT: {
      return { ...state, count: action.payload };
    }
    default:
      return state;
  }
};

export default deviceReducer;
