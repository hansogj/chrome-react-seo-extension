import maybe from "maybe-for-sure";
import { createSelector } from "reselect";
import { DiscogsState } from "../discogs";
import { RootState } from "../root.reducers";
import { selectFromRoot } from "../utils";

export const getDiscogsState = (state: Partial<RootState>): DiscogsState =>
  selectFromRoot(state, "Discogs")!;

export const getFolders = createSelector(getDiscogsState, (discogs) =>
  maybe(discogs).mapTo("folders").valueOr([])
);

export const getWantList = createSelector(getDiscogsState, (discogs) =>
  maybe(discogs)
    .mapTo("wantList")
    .valueOr({} as DiscogsState["wantList"])
);

export const getFields = createSelector(getDiscogsState, (discogs) =>
  maybe(discogs)
    .mapTo("fields")
    .valueOr([] as DiscogsState["fields"])
);
