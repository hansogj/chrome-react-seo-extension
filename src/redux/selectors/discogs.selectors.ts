import maybe from "maybe-for-sure";
import { createSelector } from "reselect";
import { DiscogsState } from "../discogs";
import { RootState } from "../root.reducers";
import { selectFromRoot } from "../utils";

export const getDiscogsState = (state: Partial<RootState>): DiscogsState =>
  selectFromRoot(state, "Discogs")!;

export const getReleasePageItem = createSelector(getDiscogsState, (discogs) =>
  maybe(discogs).mapTo("releasePageItem").valueOr(undefined)
);
