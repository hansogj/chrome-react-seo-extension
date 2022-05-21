import { WantList } from "../../domain";
import { ActionTypes } from "../types";

export interface WantListState {
  readonly wantList: WantList;
}

export interface WantListActionData {
  wantList: Optional<WantList>;
  page: Optional<number>;
}

export enum WantListActions {
  getWantList = "GET_WANT_LIST",
  syncWantList = "SYNC_WANT_LIST",
  getWantListSuccess = "GET_WANT_LIST_SUCCESS",
  getWantListFailed = "GET_WANT_LIST_FAILED",
}

export type WantListActionTypes = ActionTypes<
  WantListActions,
  WantListActionData
>;
