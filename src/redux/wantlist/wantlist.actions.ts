import { MasterRelease, WantList } from "../../domain";
import { WantListActions, WantListActionTypes } from "./types";

export const getWantList = (page: number): WantListActionTypes => ({
  type: WantListActions.getWantList,
  page,
});

export const syncWantList = (): WantListActionTypes => ({
  type: WantListActions.syncWantList,
});

export const removeAllVersionsFromWantList = (
  master: MasterRelease
): WantListActionTypes => ({
  type: WantListActions.removeAllVersionsFromWantList,
  master,
});

export const removeAllVersionsFromWantListSuccess =
  (): WantListActionTypes => ({
    type: WantListActions.removeAllVersionsFromWantListSuccess,
  });

export const getWantListSuccess = (
  wantList: WantList
): WantListActionTypes => ({
  type: WantListActions.getWantListSuccess,
  wantList,
});
