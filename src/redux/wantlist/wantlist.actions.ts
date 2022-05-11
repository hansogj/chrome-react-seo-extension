import { WantList } from "../../domain";
import { WantListActions, WantListActionTypes } from "./types";

export const getWantList = (page: number): WantListActionTypes => ({
  type: WantListActions.getWantList,
  page,
});

export const getWantListSuccess = (
  wantList: WantList
): WantListActionTypes => ({
  type: WantListActions.getWantListSuccess,
  wantList,
});
