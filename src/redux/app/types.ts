import { User } from "../../domain";
import { ActionTypes } from "../types";
export const DISCOGS_BASE_URL = "https://api.discogs.com";
export interface AppState {
  readonly user?: User;
  readonly error?: ERROR | Error | string;
}

export enum ERROR {
  NOT_AUTHENTICATED,
}

export interface AppActionData {
  identity: Optional<string>;
  user: Optional<User>;
  userToken: Optional<string>;
  error: any;
}

export enum AppActions {
  error = "APP_ERROR",
  getIdentity = "GET_IDENTITY",
  getIdentitySuccess = "GET_IDENTITY_SUCCESS",
  getUser = "GET_USER",
  getUserSuccess = "GET_USER_SUCCESS",
  getUserFailed = "GET_USER_FAILED",
  setUserToken = "SET_USER_TOKEN",
  setUserTokenSuccess = "SET_USER_TOKEN_SUCCESS",
}

export type AppActionTypes = ActionTypes<AppActions, AppActionData>;
