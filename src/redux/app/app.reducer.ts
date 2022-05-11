import { reducerForProducers, writeToDraft } from "../utils";
import { AppActions, AppActionTypes, AppState } from "./types";

export const initialState: AppState = {
  user: undefined,
  notification: undefined,
  error: undefined,
};

const discogsReducer = reducerForProducers<
  AppState,
  AppActionTypes,
  AppActions
>(initialState, {
  GET_USER_SUCCESS: writeToDraft("user"),
  APP_ERROR: writeToDraft("error"),
  APP_SUCCESS: writeToDraft("notification"),
});

export default discogsReducer;