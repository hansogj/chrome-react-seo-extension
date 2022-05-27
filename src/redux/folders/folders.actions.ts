import { Folder, InventoryFields, SelectedFields, Release } from "../../domain";
import { FoldersActions, FoldersActionTypes } from "./types";

export const getFolders = (): FoldersActionTypes => ({
  type: FoldersActions.getFolders,
});

export const getFoldersSuccess = (
  folders: Array<Folder>
): FoldersActionTypes => ({
  type: FoldersActions.getFoldersSuccess,
  folders,
});

export const getInventoryFieldsSuccess = (fields: InventoryFields) => ({
  type: FoldersActions.getInventoryFieldsSuccess,
  fields,
});

export const setSelectedFields = (
  selectedFields: SelectedFields
): FoldersActionTypes => ({
  type: FoldersActions.setSelectedFields,
  selectedFields,
});

export const setSelectedFieldsSuccess = (
  selectedFields: SelectedFields
): FoldersActionTypes => ({
  type: FoldersActions.setSelectedFieldsSuccess,
  selectedFields,
});

export const addToFolder = (releaseId: Release["id"]): FoldersActionTypes => ({
  type: FoldersActions.addToFolder,
  releaseId,
});
export const addToFolderSuccess = (): FoldersActionTypes => ({
  type: FoldersActions.addToFolderSuccess,
});
