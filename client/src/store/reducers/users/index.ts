import { ISUser } from "../../../models/IUser";
import { UserState, UsersAction, UserActionEnum } from "./types";

const initialState: UserState = {
  users: [] as ISUser[],
  isLoading: false,
  error: "",
  selected: [],
};

const userReducer = (state = initialState, action: UsersAction): UserState => {
  switch (action.type) {
    case UserActionEnum.SET_USERS: {
      return { ...state, users: action.payload };
    }
    case UserActionEnum.SET_USERS_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case UserActionEnum.SET_USERS_ERROR: {
      return { ...state, error: action.payload, isLoading: false };
    }
    case UserActionEnum.SET_USERS_SELECTED: {
      return { ...state, selected: action.payload };
    }
    default:
      return state;
  }
};

export default userReducer;
