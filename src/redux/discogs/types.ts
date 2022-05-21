import { Instance, Release, ReleasePageItem } from "../../domain";
import { ActionTypes } from "../types";

export interface DiscogsState {
  readonly releasePageItem: Optional<ReleasePageItem>;
}

export interface DiscogsActionData {
  instance: Optional<Instance>;
  releasePageItem: Optional<ReleasePageItem>;
  releaseId: Optional<Release["id"]>;
}

export enum DiscogsActions {
  getReleasePageItem = "GET_RELEASE_PAGE_ITEM",
  getReleasePageItemSuccess = "GET_RELEASE_PAGE_ITEM_SUCCESS",

  filterReleases = "FILTER_RELEASES",
  filterSellers = "FILTER_SELLERS",
}

export type DiscogsActionTypes = ActionTypes<DiscogsActions, DiscogsActionData>;
