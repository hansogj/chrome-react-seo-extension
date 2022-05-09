import { Folder, MasterRelease, WantList } from "../../domain";
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

export const getWantList = (page: number): DiscogsActionTypes => ({
  type: DiscogsActions.getWantList,
  page,
});

export const getWantListSuccess = (wantList: WantList): DiscogsActionTypes => ({
  type: DiscogsActions.getWantListSuccess,
  wantList,
});

export const getCurrentMaster = (): DiscogsActionTypes => ({
  type: DiscogsActions.getCurrentMaster,
});

export const getCurrentMasterSuccess = (
  currentMaster: MasterRelease
): DiscogsActionTypes => ({
  type: DiscogsActions.getCurrentMasterSuccess,
  currentMaster,
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
