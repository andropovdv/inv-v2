import { ISUser } from "../../../models/IUser";

export interface UserState {
  users: ISUser[];
  isLoading: boolean;
  error: string;
  selected: number[];
}

export enum UserActionEnum {
  SET_USERS = "SET_USERS",
  SET_USERS_IS_LOADING = "SET_USERS_IS_LOADING",
  SET_USERS_ERROR = "SET_USERS_ERROR",
  SET_USERS_SELECTED = "SET_USERS_SELECTED",
}

export interface SetUsersAction {
  type: UserActionEnum.SET_USERS;
  payload: ISUser[];
}

export interface SetErrorAction {
  type: UserActionEnum.SET_USERS_ERROR;
  payload: string;
}

export interface SetIsLoadingAction {
  type: UserActionEnum.SET_USERS_IS_LOADING;
  payload: boolean;
}

export interface SetSelectedUsers {
  type: UserActionEnum.SET_USERS_SELECTED;
  payload: number[];
}

export type UsersAction =
  | SetUsersAction
  | SetErrorAction
  | SetIsLoadingAction
  | SetSelectedUsers;
