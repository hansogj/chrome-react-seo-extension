import { Artist, ArtistResult, Folder, WantList } from "../../domain";
import { InventoryFields } from "../../domain/InventoryFields";
import { ActionTypes } from "../types";

export interface DiscogsState {
  readonly artist: Artist;
  readonly artistResult: ArtistResult[];

  readonly folders: Array<Folder>;
  readonly wantList: WantList;
  readonly fields: InventoryFields;
}

export interface DiscogsActionData {
  artist: Optional<Artist>;
  artistResult: Optional<ArtistResult[]>;

  folders: Optional<Array<Folder>>;
  wantList: Optional<WantList>;
  fields: Optional<InventoryFields>;
  page: Optional<number>;
}

export enum DiscogsActions {
  getArtist = "GET_ARTIST",
  getArtistSuccess = "GET_ARTIST_SUCCESS",
  getArtistFailed = "GET_ARTIST_FAILED",

  getFolders = "GET_FOLDERS",
  getFoldersSuccess = "GET_FOLDERS_SUCCESS",
  getFoldersFailed = "GET_FOLDERS_FAILED",

  getWantList = "GET_WANT_LIST",
  getWantListSuccess = "GET_WANT_LIST_SUCCESS",
  getWantListFailed = "GET_WANT_LIST_FAILED",

  getInventoryFieldsSuccess = "GET_INVENTORY_FIELDS_SUCCESS",

  filterReleases = "FILTER_RELEASES",
  filterSellers = "FILTER_SELLERS",
}

export type DiscogsActionTypes = ActionTypes<DiscogsActions, DiscogsActionData>;
export type DispatchAction<T> = Fn<[T], DiscogsActionTypes>;
