import { MasterRelease, WantList } from "../../domain";
import { ActionTypes } from "../types";

export interface WantListState {
  readonly wantList: WantList;
  readonly isSyncing: boolean;
}

export interface WantListActionData {
  wantList: Optional<WantList>;
  page: Optional<number>;
  master: Optional<MasterRelease>;
}

export enum WantListActions {
  getWantList = "GET_WANT_LIST",
  syncWantList = "SYNC_WANT_LIST",
  getWantListSuccess = "GET_WANT_LIST_SUCCESS",
  removeAllVersionsFromWantList = "REMOVE_ALL_ITEMS_FROM_WANT_LIST",
  removeAllVersionsFromWantListSuccess = "REMOVE_ALL_ITEMS_FROM_WANT_LIST_SUCCESS",
  getWantListFailed = "GET_WANT_LIST_FAILED",
}

export type WantListActionTypes = ActionTypes<
  WantListActions,
  WantListActionData
>;
