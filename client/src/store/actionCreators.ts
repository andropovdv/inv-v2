import { AuthActionCreator } from "./reducers/auth/action-creators";
import { UserActionCreator } from "./reducers/users/action-creators";
import { VendorActionCreator } from "./reducers/vendors/action-creators";
import { TypeActionCreator } from "./reducers/types/action-creators";
import { DeviceActionCreator } from "./reducers/devices/action-creators";
import { PropertyActionCreator } from "./reducers/property/action-creators";
import { ValueActionCreator } from "./reducers/values/action-creators";

export const allActionCreators = {
  ...AuthActionCreator,
  ...UserActionCreator,
  ...VendorActionCreator,
  ...TypeActionCreator,
  ...DeviceActionCreator,
  ...PropertyActionCreator,
  ...ValueActionCreator,
};
