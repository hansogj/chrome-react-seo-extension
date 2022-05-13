import maybe from "maybe-for-sure";
import { createSelector } from "reselect";
import { FoldersState } from "../folders";
import { RootState } from "../root.reducers";
import { selectFromRoot } from "../utils";

export const getFoldersState = (state: Partial<RootState>): FoldersState =>
  selectFromRoot(state, "Folders")!;

export const getFolders = createSelector(getFoldersState, (discogs) =>
  maybe(discogs).mapTo("folders").valueOr([])
);

export const getFields = createSelector(getFoldersState, (discogs) =>
  maybe(discogs)
    .mapTo("fields")
    .valueOr([] as FoldersState["fields"])
);

export const getSelectedFields = createSelector(getFoldersState, (discogs) =>
  maybe(discogs)
    .mapTo("selectedFields")
    .valueOr({} as FoldersState["selectedFields"])
);
