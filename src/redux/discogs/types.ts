import { Instance, Release, ReleaseInView } from "../../domain";
import { ActionTypes } from "../types";

export interface DiscogsState {
  readonly releaseInView: ReleaseInView;
}

export interface DiscogsActionData {
  instance: Optional<Instance>;
  releaseInView: Optional<ReleaseInView>;
  releaseId: Optional<Release["id"]>;
}

export enum DiscogsActions {
  getCurrentMaster = "GET_CURRENT_MASTER",
  getCurrentMasterSuccess = "GET_CURRENT_MASTER_SUCCESS",

  filterReleases = "FILTER_RELEASES",
  filterSellers = "FILTER_SELLERS",
}

export type DiscogsActionTypes = ActionTypes<DiscogsActions, DiscogsActionData>;
export type DispatchAction<T> = Fn<[T], DiscogsActionTypes>;
