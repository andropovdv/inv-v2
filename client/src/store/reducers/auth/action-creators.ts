// import { RouterNames } from "./../../../utils/consts";
import { IUser } from "./../../../models/IUser";
import jwt_decode from "jwt-decode";
import {
  AuthActionEnum,
  SetAutAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from "./types";
import { UserService } from "../../../api/UserService";
import { AppDispatch } from "../..";

export const AuthActionCreator = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAutAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload: payload,
  }),
  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreator.setIsLoading(true));
      const { data } = await UserService.login(email, password);
      if (data) {
        localStorage.setItem("token", data.token);
        const res: IUser = jwt_decode(data.token);
        dispatch(AuthActionCreator.setUser(res));
        dispatch(AuthActionCreator.setIsAuth(true));
      }
    } catch (e) {
      dispatch(AuthActionCreator.setError("Произошла ошибка"));
    } finally {
      dispatch(AuthActionCreator.setIsLoading(false));
    }
  },
  check: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreator.setIsLoading(true));
      const { data } = await UserService.check();
      localStorage.setItem("token", data.token);
      const res: IUser = jwt_decode(data.token);
      dispatch(AuthActionCreator.setUser(res));
      dispatch(AuthActionCreator.setIsAuth(true));
    } catch (e) {
      console.log(e);
      dispatch(AuthActionCreator.setIsAuth(false));
    } finally {
      dispatch(AuthActionCreator.setIsLoading(false));
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("token");
    dispatch(AuthActionCreator.setUser({} as IUser));
    dispatch(AuthActionCreator.setIsAuth(false));
  },
  // getUsers: () => async (dispatch: AppDispatch) => {
  //   try {
  //     dispatch(AuthActionCreator.setIsLoading(true));
  //     const { data } = await UserService.getUsers();
  //     if (data) {
  //       console.log(data);
  //     }
  //   } catch (e) {
  //     dispatch(AuthActionCreator.setError("error get users"));
  //   } finally {
  //     dispatch(AuthActionCreator.setIsLoading(false));
  //   }
  // },
};
