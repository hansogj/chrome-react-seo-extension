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

export const addToFolderSuccess = (instance: Instance): DiscogsActionTypes => ({
  type: DiscogsActions.getCurrentMaster,
  instance,
});
