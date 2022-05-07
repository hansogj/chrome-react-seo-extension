import { createSelector } from "reselect";
import { AppState } from "../app";
import { RootState } from "../root.reducers";
import { selectFromRoot } from "../utils";

export const getAppState = (state: Partial<RootState>): AppState =>
  selectFromRoot(state, "App")!;

export const getUser = createSelector(getAppState, ({ user }) => user);
