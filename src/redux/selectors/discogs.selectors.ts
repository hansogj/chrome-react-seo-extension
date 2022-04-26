import { createSelector } from "reselect";
import { DiscogsState } from "../discogs";
import { RootState } from "../root.reducers";
import { selectFromRoot } from "../utils";

export const getDiscogsState = (state: Partial<RootState>): DiscogsState =>
  selectFromRoot(state, "Discogs")!;
