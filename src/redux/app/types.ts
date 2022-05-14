import { User } from "../../domain";
import { ActionTypes } from "../types";
export const DISCOGS_BASE_URL = "https://api.discogs.com";

export const MOCKED_RELEASE_URL = [
  "https://www.discogs.com/release/11874869-Genesis-Selling-England-By-The-Pound",
  "https://www.discogs.com/release/10083775-Walter-Smith-III-Live-In-Paris",
  "https://www.discogs.com/master/298833-Benny-Golson-Groovin-With-Golson",
];

export const getMockRelease = () =>
  MOCKED_RELEASE_URL[Math.floor(Math.random() * MOCKED_RELEASE_URL.length)];

export interface AppState {
  readonly user: Optional<User>;
  readonly error: Optional<ERROR | Error | string>;
  readonly notification: Optional<string>;
  readonly isLoading: boolean;
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
}

export type AppActionTypes = ActionTypes<AppActions, AppActionData>;
export type DispatchAction<T> = Fn<[T], AppActionTypes>;
