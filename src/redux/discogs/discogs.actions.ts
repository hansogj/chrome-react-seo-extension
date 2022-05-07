import { Artist, ArtistResult, Folder, Want, WantList } from "../../domain";
import { InventoryFields } from "../../domain/InventoryFields";
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

export const getFolders = (): DiscogsActionTypes => ({
  type: DiscogsActions.getFolders,
});

export const getFoldersSuccess = (
  folders: Array<Folder>
): DiscogsActionTypes => ({
  type: DiscogsActions.getFoldersSuccess,
  folders,
});

export const getInventoryFieldsSuccess = (fields: InventoryFields) => ({
  type: DiscogsActions.getInventoryFieldsSuccess,
  fields,
});

export const filterReleases = (): DiscogsActionTypes => ({
  type: DiscogsActions.filterReleases,
});

export const filterSellers = (): DiscogsActionTypes => ({
  type: DiscogsActions.filterSellers,
});

export const getWantList = (page: number): DiscogsActionTypes => ({
  type: DiscogsActions.getWantList,
  page,
});

export const getWantListSuccess = (wantList: WantList): DiscogsActionTypes => ({
  type: DiscogsActions.getWantListSuccess,
  wantList,
});
