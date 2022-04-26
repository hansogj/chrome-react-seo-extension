import maybe from "maybe-for-sure";
import { createSelector } from "reselect";
import { User } from "../../api/domain";
import { getDiscogsState } from "./discogs.selectors";

export const getUser = createSelector(
  getDiscogsState,
  ({ user }) => maybe(user).valueOr({}) as User
);

export const getFoldersResource = createSelector(
  getUser,
  ({ collection_folders_url }) => collection_folders_url
);
