import { User } from "../../domain";
import { ActionTypes } from "../types";
export const DISCOGS_BASE_URL = "https://api.discogs.com";

export const MOCKED_RELEASE_URL =
  "https://www.discogs.com/release/11874869-Genesis-Selling-England-By-The-Pound";

export interface AppState {
  readonly user: Optional<User>;
  readonly error: Optional<ERROR | Error | string>;
  readonly notification: Optional<string>;
  readonly isLoading: boolean;
}

export enum ERROR {
  NOT_AUTHENTICATED,
}

export interface AppActionData {
  identity: Optional<string>;
  user: Optional<User>;
  userToken: Optional<string>;
  error: any;
  notification: string;
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
}

export type AppActionTypes = ActionTypes<AppActions, AppActionData>;
export type DispatchAction<T> = Fn<[T], AppActionTypes>;
