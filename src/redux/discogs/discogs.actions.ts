import {
  Folder,
  Instance,
  MasterRelease,
  Release,
  ReleaseInView,
  WantList,
} from "../../domain";
import { SelectedFields } from "../../domain/Inventory";
import { InventoryFields } from "../../domain/InventoryFields";
import { DiscogsActions, DiscogsActionTypes } from "./types";

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

export const getCurrentMaster = (): DiscogsActionTypes => ({
  type: DiscogsActions.getCurrentMaster,
});

export const getCurrentMasterSuccess = (
  releaseInView: ReleaseInView
): DiscogsActionTypes => ({
  type: DiscogsActions.getCurrentMasterSuccess,
  releaseInView,
});

export const setSelectedFields = (
  selectedFields: SelectedFields
): DiscogsActionTypes => ({
  type: DiscogsActions.setSelectedFields,
  selectedFields,
});

export const setSelectedFieldsSuccess = (
  selectedFields: SelectedFields
): DiscogsActionTypes => ({
  type: DiscogsActions.setSelectedFieldsSuccess,
  selectedFields,
});

export const addToFolder = (releaseId: Release["id"]): DiscogsActionTypes => ({
  type: DiscogsActions.addToFolder,
  releaseId,
});

export const addToFolderSuccess = (instance: Instance): DiscogsActionTypes => ({
  type: DiscogsActions.getCurrentMaster,
  instance,
});
