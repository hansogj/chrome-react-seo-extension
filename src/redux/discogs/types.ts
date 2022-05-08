import { Folder, WantList } from "../../domain";
import { InventoryFields } from "../../domain/InventoryFields";
import { ActionTypes } from "../types";

export interface DiscogsState {
  readonly folders: Array<Folder>;
  readonly wantList: WantList;
  readonly fields: InventoryFields;
  readonly selectedFields: Record<string, string>;
}

export interface DiscogsActionData {
  folders: Optional<Array<Folder>>;
  wantList: Optional<WantList>;
  fields: Optional<InventoryFields>;
  selectedFields: Optional<Record<string, string>>;
  page: Optional<number>;
}

export enum DiscogsActions {
  getFolders = "GET_FOLDERS",
  getFoldersSuccess = "GET_FOLDERS_SUCCESS",
  getFoldersFailed = "GET_FOLDERS_FAILED",

  getWantList = "GET_WANT_LIST",
  getWantListSuccess = "GET_WANT_LIST_SUCCESS",
  getWantListFailed = "GET_WANT_LIST_FAILED",

  getInventoryFieldsSuccess = "GET_INVENTORY_FIELDS_SUCCESS",

  setSelectedFields = "SET_SELECTED_FIELDS",
  setSelectedFieldsSuccess = "SET_SELECTED_FIELDS_SUCCESS",
  filterReleases = "FILTER_RELEASES",
  filterSellers = "FILTER_SELLERS",
}

export type DiscogsActionTypes = ActionTypes<DiscogsActions, DiscogsActionData>;
export type DispatchAction<T> = Fn<[T], DiscogsActionTypes>;
