import { Instance, Release, ReleasePageItem, Version } from "../../domain";
import { ActionTypes } from "../types";

export interface DiscogsState {
  readonly releasePageItem: Optional<ReleasePageItem>;
}

export interface DiscogsActionData {
  instance: Optional<Instance>;
  releasePageItem: Optional<ReleasePageItem>;
}

export enum DiscogsActions {
  getReleasePageItem = "GET_RELEASE_PAGE_ITEM",
  getReleasePageItemSuccess = "GET_RELEASE_PAGE_ITEM_SUCCESS",
}

export type DiscogsActionTypes = ActionTypes<DiscogsActions, DiscogsActionData>;
