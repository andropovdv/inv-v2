import { AuthActionCreator } from "./reducers/auth/action-creators";
import { UserActionCreator } from "./reducers/users/action-creators";
import { VendorActionCreator } from "./reducers/vendors/action-creators";

export const allActionCreators = {
  ...AuthActionCreator,
  ...UserActionCreator,
  ...VendorActionCreator,
};
