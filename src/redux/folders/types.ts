import { Folder, InventoryFields, Release } from "../../domain";
import { ActionTypes } from "../types";

export interface FoldersState {
  readonly folders: Array<Folder>;
  readonly fields: InventoryFields;
  readonly selectedFields: Record<string, string>;
}

export interface FoldersActionData {
  folders: Optional<Array<Folder>>;
  fields: Optional<InventoryFields>;
  selectedFields: Optional<Record<string, string>>;
  releaseId: Optional<Release["id"]>;
}

export enum FoldersActions {
  getFolders = "GET_FOLDERS",
  getFoldersSuccess = "GET_FOLDERS_SUCCESS",
  getFoldersFailed = "GET_FOLDERS_FAILED",

  addToFolder = "ADD_TO_FOLDER",
  addToFolderSuccess = "ADD_TO_FOLDER_SUCCESS",

  getInventoryFieldsSuccess = "GET_INVENTORY_FIELDS_SUCCESS",

  setSelectedFields = "SET_SELECTED_FIELDS",
  setSelectedFieldsSuccess = "SET_SELECTED_FIELDS_SUCCESS",
}

export type FoldersActionTypes = ActionTypes<FoldersActions, FoldersActionData>;
export type DispatchAction<T> = Fn<[T], FoldersActionTypes>;