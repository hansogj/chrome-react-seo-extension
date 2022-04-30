import maybe from "maybe-for-sure";
import { createSelector } from "reselect";
import { User } from "../../api/domain";
import { getDiscogsState } from "./discogs.selectors";

export const getUser = createSelector(getDiscogsState, ({ user }) => user);

export const getFoldersResource = createSelector(getUser, (user) =>
  maybe(user).mapTo("collection_folders_url").valueOr(undefined)
);
