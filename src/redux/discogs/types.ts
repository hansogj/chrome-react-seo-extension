import { Folder, Instance, Release, ReleaseInView } from "../../domain";
import { InventoryFields } from "../../domain/InventoryFields";
import { ActionTypes } from "../types";

export interface DiscogsState {
  readonly folders: Array<Folder>;
  readonly fields: InventoryFields;
  readonly selectedFields: Record<string, string>;
  readonly releaseInView: ReleaseInView;
}

export interface DiscogsActionData {
  folders: Optional<Array<Folder>>;
  fields: Optional<InventoryFields>;
  selectedFields: Optional<Record<string, string>>;
  releaseInView: Optional<ReleaseInView>;
  releaseId: Optional<Release["id"]>;
  instance: Optional<Instance>;
}

export enum DiscogsActions {
  getFolders = "GET_FOLDERS",
  getFoldersSuccess = "GET_FOLDERS_SUCCESS",
  getFoldersFailed = "GET_FOLDERS_FAILED",

  getCurrentMaster = "GET_CURRENT_MASTER",
  getCurrentMasterSuccess = "GET_CURRENT_MASTER_SUCCESS",

  addToFolder = "ADD_TO_FOLDER",
  addToFolderSuccess = "ADD_TO_FOLDER_SUCCESS",

  getInventoryFieldsSuccess = "GET_INVENTORY_FIELDS_SUCCESS",

  setSelectedFields = "SET_SELECTED_FIELDS",
  setSelectedFieldsSuccess = "SET_SELECTED_FIELDS_SUCCESS",
  filterReleases = "FILTER_RELEASES",
  filterSellers = "FILTER_SELLERS",
}

export type DiscogsActionTypes = ActionTypes<DiscogsActions, DiscogsActionData>;
export type DispatchAction<T> = Fn<[T], DiscogsActionTypes>;
