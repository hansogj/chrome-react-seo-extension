import { Artist, ArtistResult, Folder, User } from "../../api/domain";
import { DiscogsActions, DiscogsActionTypes } from "./types";

export const getArtist = (artist: Artist): DiscogsActionTypes => ({
  type: DiscogsActions.getArtist,
  artist,
});

export const getArtistSuccess = (
  artist: Artist,
  artistResult: ArtistResult[]
): DiscogsActionTypes => ({
  type: DiscogsActions.getArtistSuccess,
  artist,
  artistResult,
});

export const getUser = (): DiscogsActionTypes => ({
  type: DiscogsActions.getUser,
});

export const getUserSuccess = (user: User): DiscogsActionTypes => ({
  type: DiscogsActions.getUserSuccess,
  user,
});

export const getFolders = (): DiscogsActionTypes => ({
  type: DiscogsActions.getFolders,
});

export const getFoldersSuccess = (
  folders: Array<Folder>
): DiscogsActionTypes => ({
  type: DiscogsActions.getFoldersSuccess,
  folders,
});
