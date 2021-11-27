import { UserService } from "./../../../api/UserService";
import { AppDispatch } from "./../../index";
import {
  SetErrorAction,
  SetIsLoadingAction,
  SetSelectedUsers,
  SetUsersAction,
  UserActionEnum,
} from "./types";
import { ISUser } from "./../../../models/IUser";

export const UserActionCreator = {
  setUser: (users: ISUser[]): SetUsersAction => ({
    type: UserActionEnum.SET_USERS,
    payload: users,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: UserActionEnum.SET_USERS_IS_LOADING,
    payload: payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: UserActionEnum.SET_USERS_ERROR,
    payload: payload,
  }),
  setSelectedUsers: (payload: number[]): SetSelectedUsers => ({
    type: UserActionEnum.SET_USERS_SELECTED,
    payload: payload,
  }),
  getUser: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(UserActionCreator.setIsLoading(true));
      const { data } = await UserService.getUsers();
      if (data) {
        dispatch(UserActionCreator.setUser(data));
      }
    } catch (e) {
      dispatch(UserActionCreator.setError("Error in get users"));
    } finally {
      dispatch(UserActionCreator.setIsLoading(false));
    }
  },
  registerUser:
    (email: string, password: string, role: string, username: string) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(UserActionCreator.setIsLoading(true));
        await UserService.register(email, password, role, username);
        dispatch<any>(UserActionCreator.getUser());
      } catch (e) {
        dispatch(UserActionCreator.setError((e as Error).message));
      } finally {
        dispatch(UserActionCreator.setIsLoading(false));
      }
    },
  deleteUser: (ids: number[]) => async (dispatch: AppDispatch) => {
    try {
      let payload = {
        id: ids,
      };

      dispatch(UserActionCreator.setIsLoading(true));

      const { data } = await UserService.deleteUser(payload);
      if (data) {
        console.log("УДАЛЕНО", data);
      }
      dispatch(UserActionCreator.setSelectedUsers([]));
      dispatch<any>(UserActionCreator.getUser());
    } catch (e) {
      dispatch(UserActionCreator.setError((e as Error).message));
    } finally {
      dispatch(UserActionCreator.setIsLoading(false));
    }
  },
  updateUser: (user: ISUser) => async (dispatch: AppDispatch) => {
    try {
      dispatch(UserActionCreator.setIsLoading(false));
      const { data } = await UserService.updateUser(user);
      if (data) {
        console.log("UPDATED", data);
      }
      dispatch(UserActionCreator.setSelectedUsers([]));
      dispatch<any>(UserActionCreator.getUser());
    } catch (e) {
      dispatch(UserActionCreator.setError((e as Error).message));
    } finally {
      dispatch(UserActionCreator.setIsLoading(false));
    }
  },
};
