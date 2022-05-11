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

export const getFields = createSelector(getDiscogsState, (discogs) =>
  maybe(discogs)
    .mapTo("fields")
    .valueOr([] as DiscogsState["fields"])
);

export const getSelectedFields = createSelector(getDiscogsState, (discogs) =>
  maybe(discogs)
    .mapTo("selectedFields")
    .valueOr({} as DiscogsState["selectedFields"])
);

export const getReleaseInView = createSelector(getDiscogsState, (discogs) =>
  maybe(discogs)
    .mapTo("releaseInView")
    .valueOr({} as DiscogsState["releaseInView"])
);
