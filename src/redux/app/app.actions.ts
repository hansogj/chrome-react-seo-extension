import { User } from "../../domain";
import { AppActions, AppActionTypes, View } from "./types";

export const error = (error: any): AppActionTypes => ({
  type: AppActions.error,
  error,
});

export const success = (notification?: string): AppActionTypes => ({
  type: AppActions.success,
  notification,
});

export const getUser = (): AppActionTypes => ({
  type: AppActions.getUser,
});

export const getUserSuccess = (user: User): AppActionTypes => ({
  type: AppActions.getUserSuccess,
  user,
});

export const logOut = (): AppActionTypes => ({
  type: AppActions.logOut,
});

export const setUserToken = (userToken: string): AppActionTypes => ({
  type: AppActions.setUserToken,
  userToken,
});

export const setUserTokenSuccess = (): AppActionTypes => ({
  type: AppActions.setUserTokenSuccess,
});

export const getIdentity = (): AppActionTypes => ({
  type: AppActions.getIdentity,
});

export const getIdentitySuccess = (identity: string): AppActionTypes => ({
  type: AppActions.getIdentitySuccess,
  identity,
});

export const setView = (view: View): AppActionTypes => ({
  type: AppActions.setView,
  view,
});

export const setViewSuccess = (view: View): AppActionTypes => ({
  type: AppActions.setViewSuccess,
  view,
});
