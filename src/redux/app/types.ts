import { User } from "../../domain";
import { ActionTypes } from "../types";
export const DISCOGS_BASE_URL = "https://api.discogs.com";

export const Views = ["Watch", "Add Item", "Want List"] as const;
export type View = typeof Views[number];

export interface AppState {
  readonly user: Optional<User>;
  readonly error: Optional<ERROR | Error | string>;
  readonly notification: Optional<string>;
  readonly isLoading: boolean;
  readonly view: Optional<View>;
}

export enum ERROR {
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  NO_TAB_TO_CAPTURE = "NO_TAB_TO_CAPTURE",
}

export interface AppActionData {
  identity: Optional<string>;
  user: Optional<User>;
  userToken: Optional<string>;
  error: any;
  notification: string;
  view: Optional<View>;
}

export enum AppActions {
  success = "APP_SUCCESS",
  error = "APP_ERROR",
  getIdentity = "GET_IDENTITY",
  getIdentitySuccess = "GET_IDENTITY_SUCCESS",
  getUser = "GET_USER",
  getUserSuccess = "GET_USER_SUCCESS",
  getUserFailed = "GET_USER_FAILED",
  setUserToken = "SET_USER_TOKEN",
  setUserTokenSuccess = "SET_USER_TOKEN_SUCCESS",
  logOut = "APP_LOG_OUT",
  setView = "APP_SET_VIEW",
  setViewSuccess = "APP_SET_VIEW_SUCCESS",
}

export type AppActionTypes = ActionTypes<AppActions, AppActionData>;
