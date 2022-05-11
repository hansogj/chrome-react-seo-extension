import maybe from "maybe-for-sure";
import { createSelector } from "reselect";
import { AppState } from "../app";
import { RootState } from "../root.reducers";
import { selectFromRoot } from "../utils";

export const getAppState = (state: Partial<RootState>): AppState =>
  selectFromRoot(state, "App")!;

export const getUser = createSelector(getAppState, ({ user }) => user);

export const getNotification = createSelector(getAppState, (appState) =>
  maybe(appState).mapTo("notification").valueOr(undefined)
);
