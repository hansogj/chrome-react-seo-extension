import maybe from "maybe-for-sure";
import { createSelector } from "reselect";
import { AppState, ERROR } from "../app";
import { RootState } from "../root.reducers";
import { selectFromRoot } from "../utils";
import { getReleasePageItem } from "./discogs.selectors";

export const getAppState = (state: Partial<RootState>): AppState =>
  selectFromRoot(state, "App")!;

export const getUser = createSelector(getAppState, ({ user }) => user);

export const getUserId = createSelector(getUser, (user) =>
  maybe(user).mapTo("id").valueOr(undefined)
);

export const getNotification = createSelector(getAppState, (appState) =>
  maybe(appState).mapTo("notification").valueOr(undefined)
);

export const isLoading = createSelector(
  getAppState,
  ({ isLoading }) => isLoading
);

export const notAuthenticated = createSelector(
  getAppState,
  ({ error }) => error === ERROR.NOT_AUTHENTICATED
);

export const getActiveView = createSelector(
  getAppState,
  getReleasePageItem,
  (appState, releasePageItem) =>
    maybe(appState)
      .mapTo("view")
      .nothingIf(() => !releasePageItem)
      .valueOr(undefined)
);
