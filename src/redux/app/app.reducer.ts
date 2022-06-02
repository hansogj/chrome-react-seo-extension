import { reducerForProducers, writeToDraft } from "../utils";
import { AppActions, AppActionTypes, AppState } from "./types";

export const initialState: AppState = {
  user: undefined,
  notification: undefined,
  error: undefined,
  isLoading: true,
  view: undefined,
};

const discogsReducer = reducerForProducers<
  AppState,
  AppActionTypes,
  AppActions
>(initialState, {
  GET_USER_SUCCESS: (draft, action) => {
    draft.isLoading = false;
    draft.user = action.user;
    draft.error = undefined;
  },
  APP_ERROR: (draft, action) => {
    draft.isLoading = false;
    draft.error = action.error;
  },
  APP_NOTIFY: writeToDraft("notification"),
  APP_NOTIFY_RESET: writeToDraft("notification"),
  APP_SET_VIEW_SUCCESS: writeToDraft("view"),
});

export default discogsReducer;
